import React, { useState, useCallback, useEffect } from 'react';
import ConferenceFilters from './ConferenceFilters';
import LoadingFakeText from 'components/common/fakeText/LoadingFakeText';
import ConferenceList from './ConferenceList';
//import { generateDefaultFilters } from 'utils/functions';
import { useToast } from 'hooks/toasts';
import { useQuery, useMutation } from '@apollo/client';
import { CONFERENCE_LIST_QUERY } from '../queries/ConferenceListQuery';
import { useEmail } from 'hooks/useEmail';
import Pagination from 'components/common/pagination/Pagination';
import { useFooter } from 'providers/AreasProvider';
import { ATTEND_CONFERENCE_MUTATION } from '../mutations/AttendConference';
import { useTranslation } from 'react-i18next';
import { WITHDRAW_CONFERENCE_MUTATION } from '../mutations/WithdrawConference';
import DialogDisplay from 'components/common/dialogBox/DialogDisplay';
import ConferenceCodeModal from './ConferenceCodeModal';



const defaultPager = {
    totalCount: 0,
    page: 0, 
    pageSize: 3 
}

const ConferenceListContainer = () => {
    const addToast = useToast();
    const [email] = useEmail();
    const [filters, setFilters] = useState({});
    const [, setFooter] = useFooter();
    const [pager, setPager] = useState(defaultPager);
    const [code, setCode] = useState("");
    const [open, setOpen] = useState(false);

    const {t} = useTranslation();


    const {loading, data, refetch} = useQuery(CONFERENCE_LIST_QUERY, {
        variables: {
            pager: {page: pager.page, pageSize: pager.pageSize}, 
            filters, 
            userEmail: email
        }, 
        onError: error => addToast(error, 'error', false)
    })

    const [attend] = useMutation(ATTEND_CONFERENCE_MUTATION, {
        onCompleted: (data) => {
            if (!data) {
                return
            }
            setOpen(true);
            setCode(data.attend)
        },
        onError: error => addToast(error, 'error', false)
    })

    const [withdraw] = useMutation(WITHDRAW_CONFERENCE_MUTATION, {
        onCompleted: () => {
            addToast(t("Conferences.SuccessfullyWithdrawn"), 'success')
        },
        onError: error => addToast(error, 'error', false)
    })

    const handleWithdraw = useCallback((conference) => () => {
        const input = {
            attendeeEmail: email,
            conferenceId: conference.id
        }
        withdraw({ variables: { input } })
    }, [withdraw, email]);

    
    const handleAttend = useCallback((conference) => () => {
        const input = {
            attendeeEmail: email, 
            conferenceId: conference.id
        }

        attend({ variables: { input } })

    }, [attend, email])

    const handleChangePage = useCallback(newPage => {
        setPager(prevPager => ({...prevPager, page: newPage}))
    }, [setPager])

    const handleChangeRowsPerPage = useCallback((newPageSize) => {
        setPager(prevPager => ({...prevPager, pageSize: parseInt(newPageSize)}))
    }, [setPager])

    const handleRefresh = useCallback(() => {
        refetch({
            pager: {page: pager.page, pageSize: pager.pageSize}, 
            filters, 
            userEmail: email
        })
    }, [email, filters, pager.page, pager.pageSize, refetch])

    const handleCloseDialog = useCallback(() => {
        setOpen(false); 
        setCode(""); 
        refetch() 
    }, [setOpen, setCode, refetch]);

    useEffect(() => {
        if (data && pager.totalCount !== data?.conferenceList?.pagination?.totalCount) {
            setPager(currentPager => ({ ...currentPager, totalCount: data?.conferenceList?.pagination?.totalCount }));
        }
    }, [data, pager.totalCount, setPager]);

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

    const handleApplyFilters = useCallback((value) => {
        //maybe validate
        setFilters(value)
    }, []);

    if(loading) {
        return <LoadingFakeText lines={10}/>
    }
    return <>
            <ConferenceFilters filters={filters} onApplyFilters={handleApplyFilters}/>
            <ConferenceList onWithdraw={handleWithdraw} onAttend={handleAttend} conferences={data?.conferenceList?.values}/>
            <DialogDisplay
                id="showQRCode"
                open={open}
                title={t("General.Congratulations")}
                onClose={handleCloseDialog}
                content={<ConferenceCodeModal code={code}/>}/>
        </>
}

export default ConferenceListContainer