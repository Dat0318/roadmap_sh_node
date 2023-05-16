import React from 'react'
import Select from 'react-select'
import Moment from 'react-moment';
import _ from 'lodash'
import axios from 'axios'
import DatePicker, { registerLocale } from 'react-datepicker'
import moment from 'moment'
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import CustomPaging from '../../components/Common/CustomPaging'
import Switch from '../../components/Common/Switch/'
import Constants from '../../commons/Constants'
import LoadingModal from '../../components/Common/LoadingModal'
import StatusModal from '../../components/Common/StatusModal'
import ConfirmModal from '../../components/Common/ConfirmModal/ConfirmModal'
import UpdateNoteModal from '../../components/Common/UpdateNoteModal/UpdateNoteModal'
import recruitmentRequestAjax from '../../ajax/recruitmentRequest'
import { ACLModule, logout, checkIsExactPnL, getWidthContent, getResponseStatus, checkVersionPnLSameAsVinhome } from '../../commons/commonFunctions'
import IconForTextSearchAdvanced from '../../assets/img/actions/ic-plus-yellow.svg'
import IconSearch from '../../assets/img/actions/ic-search.svg'
import IconEmailDisable from '../../assets/img/actions/ic-email-disable.svg'
import IconEmailActive from '../../assets/img/actions/ic-email-active.svg'
import IconEmailLogDisable from '../../assets/img/actions/ic-mail-log-disable.svg'
import IconEmailLogActive from '../../assets/img/actions/ic-mail-log-active.svg'
import IconLock from '../../assets/img/actions/ic-lock-disable.svg'
import ImageHasNotData from '../../assets/img/pages/has-not-data.svg'
import IconSearchAdvanced from '../../assets/img/actions/ic-search-white.svg'
import IconDeleteWhite from '../../assets/img/actions/ic-trash-white.svg'
import IconNoteWhite from '../../assets/img/actions/ic-note-white.svg'
import IconAddToPosition from '../../assets/img/actions/ic-plus-green.svg';
import CampaignPopup from './create'

import 'react-datepicker/dist/react-datepicker.css'
import vi from 'date-fns/locale/vi'
import campaignRequestAjax from '../../ajax/campaignRequest';
registerLocale("vi", vi)

class RecruitmentRequest extends React.Component {
    _isMounted = false


    constructor(props) {
        super(props);
        this.state = {
            searchingInitialData: {
                positions: [],
                ranks: [],
                jobTitles: [],
                statuses: [],
                recruitmentSpecialists: [],
                fromDateUpdate: null,
                toDateUpdate: null,
                blocksOriginal: [],
                regionsOriginal: [],
                regions: [],
                unitsOriginal: [],
                units: [],
                optionStatuses: [],
                optionDropdownStatuses: [],
                categories: [],
                salaryLevels: [],
                employeeLevels: [],
                expLevels: [],
                skills: [],
                jobTags: [],
                jobType: [],
                addresses: []
            },
            searchingDataToFilter: {
                pageIndex: Constants.PAGE_INDEX_DEFAULT,
                pageSize: 15,
                SearchKeyWord: "",
                Recruiter: "", // Phụ trách TD
                Status: "",
                Position: "",
                Rank: "",
                Region: {},
                Department: {},
                Unit: {},
                FromDate: null,
                ToDate: null,
                CompletedFrom: null,
                CompletedTo: null,
                needRefresh: false
            },
            modal: {
                isShowLoadingModal: false,
                isShowPopupAdvancedSearch: false,
                isShowInfoModal: false,
                isShowStatusModal: false,
                isShowConfirmModal: false,
                isShowUpdateNoteModal: false,
                isShowCampainModal: false,
                iconUpdateNoteModal: null,
                titleUpdateNoteModal: '',
                requestIdToUpdateStatus: null,
                fromStatusToUpdateStatus: null,
                toStatusToUpdateStatus: null,
                iconConfirmModal: null,
                titleConfirmModal: '',
                requestIdToDelete: null,
                contentConfirmModal: '',
                textContentStatusModal: '',
                isSuccessStatusModal: true,

            },
            listRecruitmentRequests: {},
            isHoverSendMail: false,
            isHoverLogMail: false,
            candidateIdChecked: [],
            candidateIdToModal: []
        }

        this.aclModule = new ACLModule()
        this.permissions = {
            [Constants.REQUIREMENT_REQUESTS_FUNCTION_PERMISSION_KEY]: {
                hasCreate: this.aclModule.hasPermissionByFunctionAndAction(Constants.REQUIREMENT_REQUESTS_FUNCTION_PERMISSION_KEY, Constants.CREATE_ACTION_KEY),
                hasUpdate: this.aclModule.hasPermissionByFunctionAndAction(Constants.REQUIREMENT_REQUESTS_FUNCTION_PERMISSION_KEY, Constants.UPDATE_ACTION_KEY),
                hasDelete: this.aclModule.hasPermissionByFunctionAndAction(Constants.REQUIREMENT_REQUESTS_FUNCTION_PERMISSION_KEY, Constants.DELETE_ACTION_KEY),
                hasSearch: this.aclModule.hasPermissionByFunctionAndAction(Constants.REQUIREMENT_REQUESTS_FUNCTION_PERMISSION_KEY, Constants.SEARCH_ACTION_KEY),
                hasView: this.aclModule.hasPermissionByFunctionAndAction(Constants.REQUIREMENT_REQUESTS_FUNCTION_PERMISSION_KEY, Constants.VIEW_ACTION_KEY),
                hasViewLog: this.aclModule.hasPermissionByFunctionAndAction(Constants.REQUIREMENT_REQUESTS_FUNCTION_PERMISSION_KEY, Constants.VIEW_LOGS_ACTION_KEY),
                hasExport: this.aclModule.hasPermissionByFunctionAndAction(Constants.REQUIREMENT_REQUESTS_FUNCTION_PERMISSION_KEY, Constants.EXPORT_ACTION_KEY)
            },
            [Constants.EMAIL_TEMPLATES_FUNCTION_PERMISSION_KEY]: {
                hasSend: this.aclModule.hasPermissionByFunctionAndAction(Constants.EMAIL_TEMPLATES_FUNCTION_PERMISSION_KEY, Constants.SEND_EMAIL_ACTION_KEY),
            }
        }
        this.companyCode = localStorage.getItem('companyCode');
        this.HOAN_THANH = -1;//Hoàn thành
        this.QUA_HAN = -1;
        this.SAP_DEN_HAN = -1;
    }

    componentDidMount() {
        const isValidUser = this.aclModule.isValidPermissionMatrix()
        if (!isValidUser) {
            logout()
        }
        this._isMounted = true
        const searchingDataToFilter = { ...this.state.searchingDataToFilter }
        searchingDataToFilter.pageIndex = Constants.PAGE_INDEX_DEFAULT
        this.setState({
            searchingDataToFilter: searchingDataToFilter,
            modal: {
                ...this.state.modal,
                isShowLoadingModal: true
            }
        })

        // const params = {
        //     PageIndex: Constants.PAGE_INDEX_DEFAULT,
        //     PageSize: searchingDataToFilter.pageSize || Constants.PAGE_SIZE_DEFAULT,
        //     CompanyCode: localStorage.getItem('localStorage')
        // }

        // this.fetchRecruitmentRequestData(params)
        this.fetchSearchingInitialData()
        window.addEventListener('resize', this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        this._isMounted = false
        window.removeEventListener('resize', this.updateDimensions.bind(this));
    }

    updateDimensions(event) {
        this.setState({
            chartWidth: event.target.innerWidth
        })

    }

    fetchSearchingInitialData = () => {
        axios.all([campaignRequestAjax.getCategories(), campaignRequestAjax.getSalaryLevels(), campaignRequestAjax.getEmployeeLevels(),
        campaignRequestAjax.getExperienceLevels(), campaignRequestAjax.getskills(), campaignRequestAjax.getJobStatus(), campaignRequestAjax.getJobTags(),
        campaignRequestAjax.getJobTypes(), campaignRequestAjax.getAddress()]).then(axios.spread((...responses) => {
            if (this._isMounted) {
                this.processDataCodeName('categories', responses[0]);
                this.processDataCodeName('salaryLevels', responses[1]);
                this.processDataCodeName('employeeLevels', responses[2]);
                this.processDataCodeName('expLevels', responses[3], 'codeName');
                this.processDataCodeName('skills', responses[4]);
                this.processDataCodeName('optionDropdownStatuses', responses[5]);
                this.processDataCodeName('jobTags', responses[6]);
                this.processDataCodeName('jobType', responses[7]);
                this.processDataCodeName('addresses', responses[8]);
            }
        }))
    }

    processDataCodeName = (name, res, keyName = 'code', valueName = 'name') => {
        if (res && res.data) {
            const searchingInitialData = { ...this.state.searchingInitialData }
            const data = res.data.data;
            const result = (data || [])
                .map(item => ({ value: item[keyName], label: item[valueName], ...item }));
            searchingInitialData[name] = result;
            this.setState({ searchingInitialData: searchingInitialData })
            if (name == 'optionDropdownStatuses') {
                const params = {
                    PageIndex: Constants.PAGE_INDEX_DEFAULT,
                    PageSize: this.state.searchingDataToFilter.pageSize || Constants.PAGE_SIZE_DEFAULT,
                    CompanyCode: localStorage.getItem('companyCode')
                }

                this.fetchRecruitmentRequestData(params)
            }
        }
    }


    processMasterData = masterData => {
        if (masterData && masterData.data) {
            const searchingInitialData = { ...this.state.searchingInitialData }
            const data = masterData.data
            const jobTitles = data && Object.entries(data.jobTitles).map(item => {
                return { value: item[0], label: item[1] }
            })
            const recruiters = data && data.recruiters.map(item => {
                return { value: item, label: item }
            })
            const statuses = data && Object.entries(data.statuses).map(item => {
                return { value: item[0], label: item[1] }
            })

            searchingInitialData.jobTitles = jobTitles
            searchingInitialData.recruitmentSpecialists = recruiters
            searchingInitialData.statuses = statuses

            this.setState({ searchingInitialData: searchingInitialData })
        }
    }

    prepareListRecruitmentRequests = data => {
        if (!data || !data.data || !data.data.data || data.data.data.listCampaigns.length === 0) {
            return []
        }
        const listJobVacancies = data.data.data.listCampaigns
        let listRecruitmentRequests = {
            data: [],
            total: data.data.data.totalRecord || this.state.searchingDataToFilter.pageSize
        }

        const optionDropdownStatuses = this.state.searchingInitialData.optionDropdownStatuses;
        for (let i = 0, lenJobVacancies = listJobVacancies.length; i < lenJobVacancies; i++) {
            const optionValueArr = optionDropdownStatuses.filter(option => option.value == listJobVacancies[i].status);
            const optionValueArrCareer = optionDropdownStatuses.filter(option => option.value === listJobVacancies[i].vin_Career_Status);
            const indexOfspirit = listJobVacancies[i].createdBy?.indexOf('@') || -1;
            const item = {
                id: listJobVacancies[i].id,
                jobTitle: listJobVacancies[i].title,
                requestDate: listJobVacancies[i].dateCreated,
                deadline: listJobVacancies[i].deadline,
                vacancyNumber: listJobVacancies[i].quantity,
                numberRecruited: listJobVacancies[i].numberCandidates,
                recruiter: indexOfspirit != -1 ? listJobVacancies[i].createdBy.substring(0, indexOfspirit) : listJobVacancies[i].createdBy,
                numberCandidates: listJobVacancies[i].numberCandidates,
                status: optionValueArr?.length > 0 ? optionValueArr[0] : null,
                vin_Career_Status: optionValueArrCareer?.length > 0 ? optionValueArrCareer[0] : null,
                notes: listJobVacancies[i].note,
                enable: optionValueArr?.length > 0 && optionValueArr[0].value != 4,
                editable: listJobVacancies[i].editable || false
            }
            listRecruitmentRequests.data = listRecruitmentRequests.data.concat(item)
        }
        return listRecruitmentRequests
    }

    onChangeStatus = (val, requestId, oldData) => {
        const data = {
            "id": requestId,
            "status": val ? {
                "code": 1,
                "name": "Tin chờ duyệt"
            } : {
                "code": 4,
                "name": "Dừng hiển thị"
            }
        }
        const modal = { ...this.state.modal }
        modal.isShowUpdateNoteModal = true
        modal.titleUpdateNoteModal = 'Lý do'
        modal.requestIdToUpdateStatus = requestId
        modal.iconUpdateNoteModal = IconNoteWhite
        modal.fromStatusToUpdateStatus = oldData ? oldData.value : 0
        modal.dataUpdate = data;

        this.setState({ modal: modal })
    }

    fetchRecruitmentRequestData = params => {
        this.setState({
            modal: {
                ...this.state.modal,
                isShowLoadingModal: true
            }
        })

        campaignRequestAjax.list(params)
            .then(res => {
                if (this._isMounted) {
                    const listRecruitmentRequests = this.prepareListRecruitmentRequests(res)
                    this.setState({
                        modal: {
                            ...this.state.modal,
                            isShowLoadingModal: false
                        },
                        listRecruitmentRequests: listRecruitmentRequests
                    })
                }
            })
    }

    toggleHoverSendMail = () => {
        const isHoverSendMail = this.state.isHoverSendMail
        this.setState({ isHoverSendMail: !isHoverSendMail })
    }

    toggleHoverLogMail = () => {
        const isHoverLogMail = this.state.isHoverLogMail
        this.setState({ isHoverLogMail: !isHoverLogMail })
    }

    onChangePage = page => {
        const searchingDataToFilter = { ...this.state.searchingDataToFilter }
        searchingDataToFilter.pageIndex = page
        searchingDataToFilter.needRefresh = false
        this.setState({ searchingDataToFilter: searchingDataToFilter })

        const params = {
            pageIndex: page || Constants.PAGE_INDEX_DEFAULT,
            pageSize: searchingDataToFilter.pageSize || Constants.PAGE_SIZE_DEFAULT,
            CompanyCode: localStorage.getItem('companyCode')
        }
        if (!_.isEmpty(searchingDataToFilter.SearchKeyWord)) {
            params.SearchKeyWord = searchingDataToFilter.SearchKeyWord.trim()
        }
        if (!_.isEmpty(searchingDataToFilter.Recruiter)) {
            params.Recruiter = searchingDataToFilter.Recruiter.trim()
        }
        if (!_.isEmpty(searchingDataToFilter.Position)) {
            params.Position = searchingDataToFilter.Position.trim()
        }
        if (!_.isEmpty(searchingDataToFilter.Rank)) {
            params.Rank = searchingDataToFilter.Rank.trim()
        }
        if (searchingDataToFilter.Status) {
            params.Status = searchingDataToFilter.Status
        }
        if (searchingDataToFilter.Department && _.size(searchingDataToFilter.Department) > 0) {
            params.Department = searchingDataToFilter.Department.value
        }
        if (searchingDataToFilter.Region && _.size(searchingDataToFilter.Region) > 0) {
            params.Region = searchingDataToFilter.Region.value
        }
        if (searchingDataToFilter.Unit && _.size(searchingDataToFilter.Unit) > 0) {
            params.Unit = searchingDataToFilter.Unit.value
        }
        if (!_.isEmpty(searchingDataToFilter.FromDate)) {
            params.FromDate = searchingDataToFilter.FromDate
        }
        if (!_.isEmpty(searchingDataToFilter.ToDate)) {
            params.ToDate = searchingDataToFilter.ToDate
        }
        if (!_.isEmpty(searchingDataToFilter.CompletedFrom)) {
            params.CompletedFrom = searchingDataToFilter.CompletedFrom
        }
        if (!_.isEmpty(searchingDataToFilter.CompletedTo)) {
            params.CompletedTo = searchingDataToFilter.CompletedTo
        }

        this.fetchRecruitmentRequestData(params)
    }

    showStatus = (requestId, status) => {
        const customStylesStatus = {
            control: base => ({
                ...base,
                width: 160,
                height: 35,
                minHeight: 35
            }),
            option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                return {
                    ...styles
                };
            },
        }
        return <Select key={requestId} value={this.state.searchingInitialData.optionDropdownStatuses.filter(os => status && os.value == status.value)} options={this.state.searchingInitialData.optionDropdownStatuses} name="status" styles={customStylesStatus}
            isSearchable={false} onChange={value => this.onChangeStatus(value, requestId, status)} noOptionsMessage={() => "Không có lựa chọn"} menuPortalTarget={document.body} />
    }

    handleShowAdvancedSearch = e => {
        this.setState({
            modal: {
                ...this.state.modal,
                isShowPopupAdvancedSearch: !this.state.modal.isShowPopupAdvancedSearch
            }
        })
    }

    handleSubmitSimpleSearch = e => {
        e.preventDefault();
        const searchingDataToFilter = { ...this.state.searchingDataToFilter }
        searchingDataToFilter.needRefresh = true
        searchingDataToFilter.pageIndex = Constants.PAGE_INDEX_DEFAULT
        this.setState({ searchingDataToFilter: searchingDataToFilter })

        const params = {
            PageIndex: Constants.PAGE_INDEX_DEFAULT,
            PageSize: searchingDataToFilter.pageSize,
            CompanyCode: localStorage.getItem('companyCode')
        }
        const keyWord = searchingDataToFilter.SearchKeyWord || ''

        if (!_.isEmpty(keyWord)) {
            params.SearchKeyWord = keyWord
        }

        this.fetchRecruitmentRequestData(params)
    }

    handleTextInputChange = e => {
        const searchingDataToFilter = { ...this.state.searchingDataToFilter }
        searchingDataToFilter.SearchKeyWord = e != null ? e.target.value : ""
        this.setState({ searchingDataToFilter: searchingDataToFilter })
    }

    handleChangeSelectInputs = (e, inputName) => {
        const searchingDataToFilter = { ...this.state.searchingDataToFilter }
        if (!_.isNull(e)) {
            if (inputName !== 'Department' && inputName !== 'Region' && inputName !== 'Unit') {
                searchingDataToFilter[inputName] = e.value
            } else {
                const parentValue = e.value
                searchingDataToFilter[inputName] = { value: e.value, label: e.label, parentId: e.parentId }
                this.handleUpdateChild(inputName, parentValue)
            }
        } else {
            if (inputName !== 'Department' && inputName !== 'Region' && inputName !== 'Unit') {
                searchingDataToFilter[inputName] = ""
            } else {
                const searchingInitialData = { ...this.state.searchingInitialData }
                searchingDataToFilter[inputName] = {}
                if (inputName === 'Department') {
                    searchingDataToFilter.Region = {}
                    searchingDataToFilter.Unit = {}
                    searchingInitialData.regions = []
                    searchingInitialData.units = []
                } else if (inputName === 'Region') {
                    searchingDataToFilter.Unit = {}
                    searchingInitialData.units = []
                }
                this.setState({ searchingInitialData: searchingInitialData })
            }
        }
        this.setState({ searchingDataToFilter: searchingDataToFilter })
    }

    handleUpdateChild = (name, value) => {
        const searchingInitialData = { ...this.state.searchingInitialData }
        if (name === "Department") {
            const regionsOriginalTemp = searchingInitialData.regionsOriginal
            const regionsTemp = regionsOriginalTemp.filter(item => {
                return item.parentId == value
            })
            searchingInitialData.regions = regionsTemp
            searchingInitialData.units = []
            this.setState({ searchingInitialData: searchingInitialData })
        } else if (name === "Region") {
            const unitsOriginalTemp = searchingInitialData.unitsOriginal
            const unitsTemp = unitsOriginalTemp.filter(item => {
                return item.parentId == value
            })
            searchingInitialData.units = unitsTemp
        }
        this.setState({ searchingInitialData: searchingInitialData })
    }

    handleDatePickerInputChange = (value, stateName) => {
        const searchingDataToFilter = { ...this.state.searchingDataToFilter }
        if (moment(value, 'YYYY-MM-DD').isValid()) {
            const date = moment(value).format('YYYY-MM-DD')
            searchingDataToFilter[stateName] = date
        } else {
            searchingDataToFilter[stateName] = null
        }
        this.setState({ searchingDataToFilter: searchingDataToFilter })
    }

    handleSubmitAdvancedSearch = () => {
        const searchingDataToFilter = { ...this.state.searchingDataToFilter }
        searchingDataToFilter.needRefresh = true
        searchingDataToFilter.pageIndex = Constants.PAGE_INDEX_DEFAULT
        this.setState({ searchingDataToFilter: searchingDataToFilter })

        const searchingDataToFilterTemp = { ...searchingDataToFilter }
        searchingDataToFilterTemp.Department = (searchingDataToFilter.Department && _.size(searchingDataToFilter.Department) > 0) ? searchingDataToFilter.Department.value : ""
        searchingDataToFilterTemp.Region = (searchingDataToFilter.Region && _.size(searchingDataToFilter.Region) > 0) ? searchingDataToFilter.Region.value : ""
        searchingDataToFilterTemp.Unit = (searchingDataToFilter.Unit && _.size(searchingDataToFilter.Unit) > 0) ? searchingDataToFilter.Unit.value : ""

        const params = Object.fromEntries(Object.entries(searchingDataToFilterTemp).filter(item => { return item[1] !== "" && item[1] != null }))
        this.fetchRecruitmentRequestData(params)
    }

    deleteRecruitmentRequest = id => {
        const modal = { ...this.state.modal }
        modal.isShowConfirmModal = true
        modal.titleConfirmModal = 'Xóa yêu cầu tuyển dụng'
        modal.contentConfirmModal = 'Bạn có chắc chắn muốn xóa yêu cầu tuyển dụng này ?'
        modal.requestIdToDelete = id
        modal.iconConfirmModal = IconDeleteWhite

        this.setState({ modal: modal })
    }

    updateParent = isOk => {
        if (isOk) {
            const modal = { ...this.state.modal }
            modal.isShowLoadingModal = true
            modal.isShowStatusModal = false
            modal.isShowConfirmModal = false
            this.setState({ modal: modal })

            recruitmentRequestAjax.delete(modal.requestIdToDelete)
                .then(response => {
                    modal.isShowLoadingModal = false
                    modal.isSuccessStatusModal = false
                    modal.textContentStatusModal = 'Bạn đã xóa yêu cầu tuyển dụng không thành công.'
                    if (response && response.data && response.data.result && response.data.result.code == Constants.API_SUCCESS_CODE) {
                        modal.isShowStatusModal = true
                        modal.isSuccessStatusModal = true
                        modal.textContentStatusModal = 'Bạn đã xóa yêu cầu tuyển dụng thành công.'
                    } else {
                        modal.isShowStatusModal = true
                        modal.isSuccessStatusModal = false
                        modal.textContentStatusModal = response.data?.result?.message || 'Bạn đã xóa yêu cầu tuyển dụng không thành công.';
                    }
                    this.setState({ modal: modal })
                })
                .catch(errors => {
                    modal.isShowLoadingModal = false
                    modal.isShowStatusModal = true
                    modal.isSuccessStatusModal = false
                    modal.textContentStatusModal = 'Bạn đã xóa yêu cầu tuyển dụng không thành công.'
                    this.setState({ modal: modal })
                })
        }
    }

    updateStatusOnParent = data => {
        if (data && data.isSubmit) {
            const modal = { ...this.state.modal }
            modal.isShowLoadingModal = true
            modal.isShowStatusModal = false
            modal.isShowConfirmModal = false
            modal.isShowUpdateNoteModal = false
            modal.isShowInfoModal = false;
            this.setState({ modal: modal });
            const payload = modal.dataUpdate;
            payload.note = data.note;

            campaignRequestAjax.updateStatus(payload)
                .then(response => {
                    const [status, message, hasException] = getResponseStatus(response, 'Cập nhật trạng thái chiến dịch thành công.', 'Cập nhật trạng thái chiến dịch không thành công.', false);
                    this.setState({
                        modal: {
                            ...this.state.modal,
                            isShowLoadingModal: false,
                            isShowStatusModal: true,
                            isSuccessStatusModal: status,
                            textContentStatusModal: message
                        },
                        hasExceptionCreate: hasException
                    });
                })
                .catch(errors => {
                    modal.isShowLoadingModal = false
                    modal.isShowStatusModal = true
                    modal.isSuccessStatusModal = false
                    modal.textContentStatusModal = 'Cập nhật trạng thái chiến dịch không thành công.'
                    this.setState({ modal: modal, hasExceptionCreate: true })
                })
        }
    }

    hideModalByStateName = (stateName, shouldRefresh = true) => {
        this.setState({
            modal: {
                ...this.state.modal,
                [stateName]: false
            }
        })
        if (!this.state.hasExceptionCreate && shouldRefresh) {
            window.location.replace("/campaign-requests")
        }
    }

    showCampaignModal = async (id = null) => {
        let shouldShow = true;
        let data = null;
        if (id != null) {
            this.setState({
                modal: {
                    ...this.state.modal,
                    isShowLoadingModal: true,
                    dataUpdate: null
                }
            });
            try {
                const response = await campaignRequestAjax.detail(id);
                const [status, message, hasException] = getResponseStatus(response, '', 'Bản ghi không tồn tại', false);
                data = response.data?.data;
                if (status != true) {
                    shouldShow = false;
                    this.setState({
                        modal: {
                            ...this.state.modal,
                            isShowLoadingModal: false,
                            isShowStatusModal: true,
                            isSuccessStatusModal: status,
                            textContentStatusModal: message
                        },
                        hasExceptionCreate: true
                    });
                }
            } catch (err) {
                shouldShow = false;
                this.setState({
                    modal: {
                        ...this.state.modal,
                        isShowLoadingModal: false,
                        isShowStatusModal: true,
                        isSuccessStatusModal: false,
                        textContentStatusModal: 'Bản ghi không tồn tại'
                    },
                    hasExceptionCreate: true
                });
            }
        }
        if (shouldShow) {
            this.setState({ ...this.state, modal: { ...this.state.modal, isShowLoadingModal: false, isShowCampainModal: true, dataUpdate: data } })
        }

    }

    onPopupSubmit = (data) => {
        const modal = { ...this.state.modal }
        modal.isShowLoadingModal = true
        modal.isShowStatusModal = false
        modal.isShowConfirmModal = false
        this.setState({ modal: modal })
        let isUpdate = false;
        let messageSuccess = 'Tạo mới chiến dịch thành công.';
        let messageFail = 'Tạo mới chiến dịch không thành công.';
        if (data.id != 0) {
            isUpdate = true;
            messageSuccess = 'Cập nhật chiến dịch thành công'
            messageFail = 'Cập nhật chiến dịch không thành công'
        }
        campaignRequestAjax.createCampaign(data, isUpdate).then(response => {
            const [status, message, hasException] = getResponseStatus(response, messageSuccess, messageFail, false)

            this.setState({
                modal: {
                    ...this.state.modal,
                    isShowLoadingModal: false,
                    isShowStatusModal: true,
                    isSuccessStatusModal: status,
                    textContentStatusModal: message
                },
                hasExceptionCreate: hasException
            })
        })
            .catch(errors => {
                modal.isShowLoadingModal = false
                modal.isShowStatusModal = true
                modal.isSuccessStatusModal = false
                modal.textContentStatusModal = messageFail
                this.setState({ modal: modal, hasExceptionCreate: true })
            })

    }

    render() {
        const { searchingInitialData, searchingDataToFilter, listRecruitmentRequests, modal } = this.state,
            total = listRecruitmentRequests.total || 0,
            permissions = this.permissions;
        const actionSendMail = {
                cursor: "pointer",
                display: "inline-block",
                width: "16px",
                height: "16px",
                margin: "5px 0",
                backgroundImage: this.state.isHoverSendMail ? `url(${IconEmailActive})` : `url(${IconEmailDisable})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain"
            },
            actionLogMail = {
                cursor: "pointer",
                display: "inline-block",
                width: "18px",
                height: "18px",
                margin: "5px 0",
                backgroundImage: this.state.isHoverLogMail ? `url(${IconEmailLogActive})` : `url(${IconEmailLogDisable})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain"
            };

        return (
            <>

                <LoadingModal show={modal.isShowLoadingModal} />
                <ConfirmModal show={modal.isShowConfirmModal} onHide={e => this.hideModalByStateName('isShowConfirmModal')} titleModal={modal.titleConfirmModal} message={modal.contentConfirmModal}
                    data={modal.requestIdToDelete} iconConfirmModal={modal.iconConfirmModal} updateParent={this.updateParent} />
                <UpdateNoteModal show={modal.isShowUpdateNoteModal} iconHeader={modal.iconUpdateNoteModal} titleModal={modal.titleUpdateNoteModal} onHide={e => this.hideModalByStateName('isShowUpdateNoteModal', false)}
                    updateStatusOnParent={this.updateStatusOnParent} />
                <StatusModal show={modal.isShowStatusModal} textContent={modal.textContentStatusModal} isSuccess={modal.isSuccessStatusModal} onHide={e => this.hideModalByStateName('isShowStatusModal')} />
                <CampaignPopup show={modal.isShowCampainModal} titleModal={'TẠO CHIẾN DỊCH MỚI'} data={modal.dataUpdate} onHide={e => this.hideModalByStateName('isShowCampainModal', false)}
                    initData={searchingInitialData} onSubmit={(data) => this.onPopupSubmit(data)} />
                <div className="font-size-14 recruitment-request-management-page" style={{ width: getWidthContent(this.props.isExpand, 0) }}>
                    <div className="header-block">
                        <div className="container-fluid overflow-hidden">
                            <div className="row buttons-block">
                                <h5 className="col-md-4 text-uppercase title text-main-color font-weight-bold">QUẢN LÝ CHIẾN DỊCH TUYỂN DỤNG</h5>
                                <div className="col-md-8 group-actions">
                                    <div className="d-flex group-btn-actions">
                                        {
                                            permissions[Constants.REQUIREMENT_REQUESTS_FUNCTION_PERMISSION_KEY].hasCreate ?
                                                <div className="btn-item">
                                                    <div className="text-decoration-none cursor-pointer btn-action create-campaign" onClick={() => this.showCampaignModal()}>
                                                        <Image src={IconAddToPosition} alt="Tạo chiến dịch mới" className="ic-action" />
                                                        <span className="btn-label font-weight-500">Tạo chiến dịch mới</span>
                                                    </div>
                                                </div>
                                                : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid search-block">
                            <div className="row">
                                <div className="col-sm-10 search-form-block">
                                    <form className="search-form" onSubmit={this.handleSubmitSimpleSearch}>
                                        <div className="input-block">
                                            <input type="text" className="form-control" name="inputName" value={searchingDataToFilter.SearchKeyWord || ""} onChange={this.handleTextInputChange} placeholder="Nhập thông tin tìm kiếm" autoComplete="off" />
                                            <button type="submit" className="btn-search">
                                                <Image src={IconSearch} alt="Tìm kiếm" className="ic-action" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-sm-2 d-flex btn-search-advance-block invisible" onClick={this.handleShowAdvancedSearch}>
                                    <span className="cursor-pointer btn-search-advance"><Image src={IconForTextSearchAdvanced} alt="Tìm kiếm" className="ic-action" /><span className="font-weight-500">Tìm kiếm nâng cao</span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="list-recruitment-requests">
                        <div className={modal.isShowPopupAdvancedSearch ? 'container-fluid show-popup-advanced-search' : 'container-fluid hide-popup-advanced-search'}>
                            <div className="wrap-form-search-advanced">
                                <div className="form-search-advanced">
                                    <div className="input-item">
                                        <Select options={searchingInitialData.recruitmentSpecialists} placeholder="Phụ trách TD" isClearable={true} noOptionsMessage={() => "Không có lựa chọn"}
                                            value={(searchingInitialData.recruitmentSpecialists || []).filter(rs => rs.value == searchingDataToFilter.Recruiter)}
                                            onChange={e => this.handleChangeSelectInputs(e, 'Recruiter')} className="input"
                                            name="i_recruitment_specialists" styles={{ menu: provided => ({ ...provided, zIndex: 2 }) }} />
                                    </div>
                                    <div className="input-item">
                                        <Select options={searchingInitialData.optionStatuses} placeholder="Tình trạng" isClearable={true} noOptionsMessage={() => "Không có lựa chọn"}
                                            value={(searchingInitialData.optionStatuses || []).filter(s => s.value == searchingDataToFilter.Status)}
                                            onChange={e => this.handleChangeSelectInputs(e, 'Status')} className="input"
                                            name="i_status" styles={{ menu: provided => ({ ...provided, zIndex: 2 }) }} />
                                    </div>
                                    <div className="input-item">
                                        <Select options={searchingInitialData.jobTitles} placeholder="Vị trí tuyển dụng" isClearable={true} noOptionsMessage={() => "Không có lựa chọn"}
                                            value={(searchingInitialData.jobTitles || []).filter(jt => jt.value == searchingDataToFilter.Position)}
                                            onChange={e => this.handleChangeSelectInputs(e, 'Position')} className="input"
                                            name="i_job_title" styles={{ menu: provided => ({ ...provided, zIndex: 2 }) }} />
                                    </div>
                                    {/* TODO */}
                                    <div className="input-item">
                                        <Select options={searchingInitialData.ranks} placeholder="Cấp bậc" isClearable={true} noOptionsMessage={() => "Không có lựa chọn"}
                                            value={(searchingInitialData.ranks || []).filter(r => r.value == searchingDataToFilter.Rank)}
                                            onChange={e => this.handleChangeSelectInputs(e, 'Rank')} className="input"
                                            name="i_rank" styles={{ menu: provided => ({ ...provided, zIndex: 2 }) }} />
                                    </div>
                                    {
                                        checkIsExactPnL(Constants.PnLCODE.VinSchool) ?
                                            <div className="input-item">
                                                <Select options={searchingInitialData.units} placeholder="Cơ sở" isClearable={true} noOptionsMessage={() => "Không có lựa chọn"}
                                                    value={(searchingInitialData.units || []).filter(u => u.value == searchingDataToFilter.Unit.value)}
                                                    onChange={e => this.handleChangeSelectInputs(e, 'Unit')} className="input"
                                                    name="i_unit" styles={{ menu: provided => ({ ...provided, zIndex: 2 }) }} />
                                            </div> :
                                            <>
                                                <div className="input-item">
                                                    <Select options={searchingInitialData.blocksOriginal} placeholder="Ban/Chuỗi/Khối" isClearable={true} noOptionsMessage={() => "Không có lựa chọn"}
                                                        value={(searchingInitialData.blocksOriginal || []).filter(bo => bo.value == searchingDataToFilter.Department.value)}
                                                        onChange={e => this.handleChangeSelectInputs(e, 'Department')} className="input"
                                                        name="i_department" styles={{ menu: provided => ({ ...provided, zIndex: 2 }) }} />
                                                </div>
                                                <div className="input-item">
                                                    <Select options={searchingInitialData.regions} placeholder="Phòng/Vùng/Miền" isClearable={true} noOptionsMessage={() => "Không có lựa chọn"}
                                                        value={(searchingInitialData.regions || []).filter(r => r.value == searchingDataToFilter.Region.value)}
                                                        onChange={e => this.handleChangeSelectInputs(e, 'Region')} className="input"
                                                        name="i_region" styles={{ menu: provided => ({ ...provided, zIndex: 2 }) }} />
                                                </div>
                                                <div className="input-item">
                                                    <Select options={searchingInitialData.units} placeholder="Cơ sở" isClearable={true} noOptionsMessage={() => "Không có lựa chọn"}
                                                        value={(searchingInitialData.units || []).filter(u => u.value == searchingDataToFilter.Unit.value)}
                                                        onChange={e => this.handleChangeSelectInputs(e, 'Unit')} className="input"
                                                        name="i_unit" styles={{ menu: provided => ({ ...provided, zIndex: 2 }) }} />
                                                </div>
                                                <div className="input-item"></div>
                                            </>
                                    }

                                    <div className="input-item">
                                        <DatePicker
                                            id="i_request_from"
                                            name="i_request_from"
                                            placeholderText="Ngày yêu cầu TD từ"
                                            selected={searchingDataToFilter.FromDate ? moment(searchingDataToFilter.FromDate, 'YYYY-MM-DD').toDate() : null}
                                            onChange={requestFromDate => this.handleDatePickerInputChange(requestFromDate, "FromDate")}
                                            dateFormat="dd/MM/yyyy"
                                            showMonthDropdown={true}
                                            showYearDropdown={true}
                                            locale="vi"
                                            autoComplete="off"
                                            className="form-control input" />
                                    </div>
                                    <div className="input-item">
                                        <DatePicker
                                            id="i_request_to"
                                            name="i_request_to"
                                            placeholderText="Ngày yêu cầu TD đến"
                                            selected={searchingDataToFilter.ToDate ? moment(searchingDataToFilter.ToDate, 'YYYY-MM-DD').toDate() : null}
                                            onChange={requestToDate => this.handleDatePickerInputChange(requestToDate, "ToDate")}
                                            dateFormat="dd/MM/yyyy"
                                            showMonthDropdown={true}
                                            showYearDropdown={true}
                                            locale="vi"
                                            autoComplete="off"
                                            className="form-control input" />
                                    </div>
                                    <div className="input-item">
                                        <DatePicker
                                            id="i_deadline_from"
                                            name="i_deadline_from"
                                            placeholderText="Hạn hoàn thành TD từ"
                                            selected={searchingDataToFilter.CompletedFrom ? moment(searchingDataToFilter.CompletedFrom, 'YYYY-MM-DD').toDate() : null}
                                            onChange={deadlineFromDate => this.handleDatePickerInputChange(deadlineFromDate, "CompletedFrom")}
                                            dateFormat="dd/MM/yyyy"
                                            showMonthDropdown={true}
                                            showYearDropdown={true}
                                            locale="vi"
                                            autoComplete="off"
                                            className="form-control input" />
                                    </div>
                                    <div className="input-item">
                                        <DatePicker
                                            id="i_deadline_to"
                                            name="i_deadline_to"
                                            placeholderText="Hạn hoàn thành TD đến"
                                            selected={searchingDataToFilter.CompletedTo ? moment(searchingDataToFilter.CompletedTo, 'YYYY-MM-DD').toDate() : null}
                                            onChange={deadlineToDate => this.handleDatePickerInputChange(deadlineToDate, "CompletedTo")}
                                            dateFormat="dd/MM/yyyy"
                                            showMonthDropdown={true}
                                            showYearDropdown={true}
                                            locale="vi"
                                            autoComplete="off"
                                            className="form-control input" />
                                    </div>
                                    {
                                        checkIsExactPnL(Constants.PnLCODE.VinSchool) ?
                                            <>
                                                <div className="input-item"></div>
                                                <div className="input-item"></div>
                                                <div className="input-item"></div>
                                            </>
                                            : null
                                    }

                                </div>
                                <div className="block-btn-search">
                                    <button type="button" className="btn-search" onClick={this.handleSubmitAdvancedSearch}>
                                        <Image src={IconSearchAdvanced} alt="Tìm kiếm nâng cao" className="ic-action" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid">
                            {
                                total == 0 ?
                                    <div className="has-not-data-block"><Image src={ImageHasNotData} alt="Không có dữ liệu Yêu cầu tuyển dụng" className="img-has-not-data" /></div>
                                    :
                                    <div className="list-recruitment-requests-inner">
                                        <div className="f-grid-fixed-column">
                                            <div className="font-weight-bold col-name title expand-advanced-search">Vị trí tuyển dụng</div>
                                            {
                                                (listRecruitmentRequests.data || []).map((item, i) => {
                                                    return <div className="col-name label data text-main-color" key={i}>
                                                        <span className="ic-lock">{item.isConfidential ? <Image src={IconLock} alt="Lock" /> : null}</span>
                                                        <Link to={`/campaign-requests/${item.id}/detail`} title={item.jobTitle} className={`text-main-color normal-link label-text link-hover`}> {item.jobTitle}</Link>
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div className="f-grid-dynamic-column">
                                            <div className="body-scroll">
                                                <div className="row-header">
                                                    <div className="font-weight-bold item title col-request-date expand-advanced-search">Ngày yêu cầu</div>
                                                    <div className="font-weight-bold item title col-deadline expand-advanced-search">Hạn hoàn thành</div>
                                                    <div className="font-weight-bold item title col-total-vacancies expand-advanced-search">Cần tuyển</div>
                                                    <div className="font-weight-bold item title col-recruitment expand-advanced-search">Phụ trách TD</div>
                                                    <div className="font-weight-bold item title col-number-vacancies expand-advanced-search">Số ứng viên hiện tại</div>
                                                    <div className="font-weight-bold item title col-status expand-advanced-search">Tình trạng {checkVersionPnLSameAsVinhome() && "TopCV"}</div>
                                                    {checkVersionPnLSameAsVinhome() && <div className="font-weight-bold item title col-status expand-advanced-search">Tình trạng Vingroup Career</div>}
                                                    <div className="font-weight-bold item title col-action col-campaign expand-advanced-search">Tác vụ</div>
                                                </div>
                                                <div className="row-body">
                                                    {
                                                        (listRecruitmentRequests.data || []).map((item, index) => {
                                                            return <div className={`row-table text-main-color`} key={index}>
                                                                <div className="item data col-request-date"><Moment format="DD/MM/YYYY">{item.requestDate}</Moment></div>
                                                                <div className="item data col-deadline"><Moment format="DD/MM/YYYY">{item.deadline}</Moment></div>
                                                                <div className="item data col-total-vacancies">{item.vacancyNumber}</div>
                                                                <div className="item data col-recruitment">{item.recruiter}</div>
                                                                <div className="item data col-number-vacancies">{item.numberCandidates}</div>
                                                                <div className="item data col-status text-main-color">{item.status?.label || ''}</div>
                                                                {checkVersionPnLSameAsVinhome() && <div className="item data col-status text-main-color">{item.vin_Career_Status?.label || ''}</div>}
                                                                <div className="item data col-action col-campaign" style={{ lineHeight: 'unset' }}>
                                                                    <div className='action-note'>
                                                                        <Switch isOn={item.enable && (item.vin_Career_Status && item.vin_Career_Status?.value != 4)} disabled={!item.editable} id={item.id} handleToggle={e => this.onChangeStatus(e.target.checked, item.id)} onColor={'#0B9600'} />
                                                                    </div>
                                                                    <div className="action-note" title="Ghi chú">
                                                                        {
                                                                            item.notes ?
                                                                                <OverlayTrigger
                                                                                    placement="left"
                                                                                    delay={{ show: 100, hide: 200 }}
                                                                                    overlay={
                                                                                        <Tooltip id={`tooltip-${item.id}`}>
                                                                                            <span>{item.notes}</span>
                                                                                        </Tooltip>
                                                                                    }
                                                                                >
                                                                                    <i className="ic-action ic-has-note"></i>
                                                                                </OverlayTrigger>
                                                                                :
                                                                                <i className="ic-action ic-has-not-note"></i>
                                                                        }
                                                                    </div>
                                                                    {
                                                                        item.editable ?
                                                                            <div className='action-update'>
                                                                                <div title="Sửa"><i className="ic-action ic-has-update" onClick={() => this.showCampaignModal(item.id)}></i></div>
                                                                            </div> : null
                                                                    }


                                                                </div>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                    <CustomPaging pageSize={parseInt(searchingDataToFilter.pageSize)} onChangePage={this.onChangePage} totalRecords={total} needRefresh={searchingDataToFilter.needRefresh} />
                </div>
            </>
        );
    };
}

export default RecruitmentRequest
