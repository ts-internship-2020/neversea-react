import React, { useState, useCallback, useEffect } from 'react';
import MyConferenceFilters from './MyConferenceFilters';
import LoadingFakeText from 'components/common/fakeText/LoadingFakeText';
import MyConferenceList from './MyConferenceList';
import { generateDefaultFilters } from 'utils/functions';
import { useHeader, useFooter } from 'providers/AreasProvider';
import { useTranslation } from 'react-i18next';
import MyConferenceHeader from './MyConferenceHeader';
import AddButton from 'components/common/buttons/AddButton'
import { useHistory } from 'react-router-dom';
import { useEmail } from 'hooks/useEmail';
import { useQuery } from '@apollo/client';
import { useToast } from 'hooks/toasts';
import Pagination from 'components/common/pagination/Pagination';
import { CONFERENCE_LIST_QUERY } from 'features/conference/queries/ConferenceListQuery'

const defaultPager = {
    totalCount: 0,
    page: 0, 
    pageSize: 3 
}

const MyConferenceListContainer = () => {
    const [filters, setFilters] = useState(generateDefaultFilters());
    const [, setHeader] = useHeader();
    const { t } = useTranslation();
    const history = useHistory();
    const [pager, setPager] = useState(defaultPager);
    const [, setFooter] = useFooter();
    const [email] = useEmail();
    const addToast = useToast();

    const {loading, data, refetch} = useQuery(CONFERENCE_LIST_QUERY, {
        variables: {
            pager: {
                page: pager.page,
                pageSize: pager.pageSize
            },
            filters: {
                ...filters,
                organizerEmail: email
            },
            userEmail: email
        },
        onError: error => addToast(error, 'error', false)
    })


    const handleAddConferences = useCallback(() => {
        history.push("/myConferences/new")
    }, [history])

    const handleChangePage = useCallback(newPage => {
        setPager(prevPager => ({...prevPager, page: newPage}))
    }, [setPager])

    const handleChangeRowsPerPage = useCallback((newPageSize) => {
        setPager(prevPager => ({...prevPager, pageSize: parseInt(newPageSize)}))
    }, [setPager])

    const handleRefresh = useCallback(() => {
        refetch({
            pager: {page: pager.page, pageSize: pager.pageSize}, 
            filters: {
                ...filters, 
                organizerEmail: email
            }, 
            userEmail: email
        })
    }, [email, filters, pager.page, pager.pageSize, refetch])


    
    useEffect(() => () => setHeader(null), []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=>{setHeader(<MyConferenceHeader 
        title={t("NavBar.MyConferences")}
        actions={<AddButton key="addButton" title={t("General.Buttons.AddConference")} onClick={handleAddConferences}/>} />)},[t, setHeader, handleAddConferences]);

    useEffect(() => {
        if(data && data?.conferenceList?.pagination?.totalCount!==pager.totalCount){
            setPager(prevPager=>({...prevPager, totalCount: data?.conferenceList?.pagination?.totalCount}))
        }
    }, [data, pager.totalCount])
    
    const handleApplyFilters = useCallback((value) => {
        //maybe validate
        setFilters(value)
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => setFooter(null), []);

    useEffect(() => {
        setFooter(
            <Pagination
                totalCount={pager.totalCount}
                pageSize={pager.pageSize}
                page={pager.page}
                rowsPerPageOptions={[3, 6, 9, 12, 21]}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                onChangePage={handleChangePage}
                onRefresh={handleRefresh}
            />
        )
    }, [handleRefresh, setFooter, handleChangeRowsPerPage, handleChangePage, pager.totalCount, pager.pageSize, pager.page])



    if(loading) {
        return <LoadingFakeText lines={10}/>
    }
    return <>
            <MyConferenceFilters filters={filters} onApplyFilters={handleApplyFilters}/>
            <MyConferenceList conferences={data?.conferenceList.values}/>
        </>
}

export default MyConferenceListContainer