import React, { useState, useEffect } from "react"
import { Modal, Image } from 'react-bootstrap'
import Select from "react-select";
import _ from 'lodash'
import LoadingModal from '../../../components/Common/LoadingModal'
import StatusModal from '../../../components/Common/StatusModal'
import IconReset from '../../../assets/img/actions/ic-reset.svg'
import IconEmailWhite from '../../../assets/img/actions/ic-mail-white.svg'
import IconLineHeaderModal from '../../../assets/img/actions/ic-line-header-modal.svg';
import IconAccept from '../../../assets/img/actions/ic-check-red.svg'
import './style.scss';
import { checkVersionPnLSameAsVinhome } from '../../../commons/commonFunctions'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import CKEditor from 'ckeditor4-react'
import RecruitmentVinHome from "./RecruitmentVinHome";

const defaultData = {
    id: 0,
    position: "", //vị trí
    department: {}, // ngành nghề
    field: [], // lĩnh vực
    workAddress: {}, // địa điểm làm việc
    detailAddress: "",
    jobType: {}, //loaij hinh cong viec
    jobTags: [],
    rank: {}, // cap bac
    exp: {}, //kinh nghime
    quantity: "", //so luong
    sex: {}, //gioi tinh
    jobDescription: "", //mo ta cv
    requirement: "", //yeu cau
    benefit: "", //loi ich
    skill: [], // ki nang
    deadline: "", // han hoan thanh
    email: "", //
    contact: "", // nguoi lien he
    phone: "", // so dien thoai
    unit: {}, //ngoaij te
    salaryType: {}, //kieu luong
    salFrom: "",
    salTo: "",
    postChannel: [], //kenh dang tai
  },
  GenderOptions = [
    { value: "1", label: "Nam", code: "1", name: "Nam" },
    { value: "2", label: "Nữ" },
  ],
  CurrencyOptions = [
    { value: "USD", label: "USD", code: "USD", name: "USD" },
    { value: "VND", label: "VND", code: "VND", name: "VND" },
  ],
  PostChannelOptions = [
    { value: 1, label: "TopCV" },
    { value: 2, label: "Vingroup Career Portal" },
  ],
  PostChannelOptionsInternal = [{ value: 2, label: "Vingroup Career Portal" }];

const CreateTemplateCampaignModal = (props) => {

    const [data, setData] = useState(defaultData);
		const [isInternalRecruit, setIsInternalRecruit] = useState(false);
    const [errors, setErrors] = useState({});
    const [modal, setModal] = useState({
        isShowLoadingModal: false,
        isShowStatusModal: false,
        textContentStatusModal: '',
        isSuccessStatusModal: true,
        isShowPreviewModal: false
    })
    const [title, setTitle] = useState('TẠO CHIẾN DỊCH MỚI');

    useEffect(() => {
        if (props.show == true && props.data) {
            setData(mappingDataUpdated(props.data))
            setTitle('CẬP NHẬT CHIẾN DỊCH')
        } else {
            setData(defaultData);
            setTitle('TẠO CHIẾN DỊCH MỚI')
        }
        setErrors({});
    }, [props.show]);

		useEffect(() => {
			const isInternalRecruit =
        ["6-0", "100100"].includes(data.exp?.value) ||
        data.rank?.value === 8080 ||
        data.jobTags.map((ele) => ele.value).includes(9090);

			if(isInternalRecruit) {
				data.postChannel = data.postChannel.filter(ele => ele.value !== 1);
				setData(data);
			}

			setIsInternalRecruit(isInternalRecruit);
		}, [data])
		

    const mappingDataUpdated = (data) => {
			const location =  JSON.parse(data.location).locations[0].code;
			const checkListSource = data.listSource?.map(item => {
				if(item === 1){
					return { value: item, label: 'TopCV' }
				}else {
					return { value: item, label: 'Vingroup Career Portal' }
				}
			});
			const result = {
			    id: data.id,
			    position: data.title, //vị trí
			    department: data.mainCategoryId ? props.initData.categories.filter(option => option.value == data.mainCategoryId)[0] : {}, // ngành nghề
			    field: data.categories ? JSON.parse(data.categories).map(item => {return {...item, value: item.code, label: item.name}}) : [], // lĩnh vực
			    workAddress: props.initData.addresses.filter(option => option.value == location)[0] || {}, // địa điểm làm việc
			    detailAddress: JSON.parse(data.location).address || '',
			    jobType: props.initData.jobType.filter(option => option.value == data.type)[0] || {}, //loaij hinh cong viec
			    jobTags: data.jobTagIds ? JSON.parse(data.jobTagIds).map(item => {return {...item, value: item.code, label: item.name}}) : [],
			    rank: data.employeeLevel ? props.initData.employeeLevels.filter(option => option.value == data.employeeLevel)[0] : {}, // cap bac
			    exp:  data.experience ? props.initData.expLevels.filter(option => option.value == data.experience)[0] : {}, //kinh nghime
			    quantity: data.quantity || '', //so luong
			    sex: data.gender ? GenderOptions.filter(option => option.value == data.gender)[0] : {}, //gioi tinh
			    jobDescription: data.jobDescription || '', //mo ta cv
			    requirement: data.jobRequirement || '', //yeu cau
			    benefit: data.jobBenefit || '', //loi ich
			    skill: data.skills ? JSON.parse(data.skills).map(item => {return {...item, value: item.code, label: item.name}}) : [], // ki nang
			    deadline: moment(data.deadline).format('DD/MM/YYYY') || '', // han hoan thanh
			    email: data.contactEmail || '', //
			    contact: data.contactName || '', // nguoi lien he
			    phone: data.contactPhone || '', // so dien thoai
			    unit:  CurrencyOptions.filter(option => option.value == data.salaryCurrency)[0] || {} , //ngoaij te
			    salaryType:  data.salaryLevel ? props.initData.salaryLevels.filter(option => option.value == data.salaryLevel)[0] : {}, //kieu luong
			    salFrom: data.salaryFrom || '',
			    salTo: data.salaryTo || '',
					postChannel: checkListSource || []
			};
			return result;
    }

    const handleChangeSelectInputs = (e, name) => {
        const requestInfos = { ...data }
        requestInfos[name] = e || {}
        setData(requestInfos);
    }

    const handleChangeSelectMultiInputs = (e, inputName) => {
        const requestInfos = { ...data }
        requestInfos[inputName] = e || []
        setData(requestInfos);
    }

    const showErrors = name => {
        return errors[name] ? <p className="show-errors">{errors[name]}</p> : null
    }

    const hideStatusModal = () => {
        setModal({
            ...modal,
            isShowStatusModal: false
        })
        if (modal.isSuccessStatusModal)
            window.location.replace("/campaign-requests")
    }

    const verifyInputs = () => {
        let _errors = {}
        const candidateInfos = { ...data }
        const requiredFields = ['position', 'workAddress', 'jobType', 'rank',
			'exp', 'quantity','deadline', 'email', 'contact', 'phone', 'unit', 'jobDescription', 'benefit', 'requirement', 'salaryType', 'postChannel']
        const optionFields = ['workAddress', 'jobType', 'rank', 'exp', 'unit', 'salaryType'];

		//ILVG-561 check nếu kênh đăng tải có TOPCV mới bắt buộc ngành nghề
		const has3thJobboard = (candidateInfos.postChannel || []).some(item => item.value != 2);
		if(has3thJobboard) {
			requiredFields.push('department');
			optionFields.push('department')
		}
        switch (candidateInfos.salaryType.value) {
            case 1: {
                requiredFields.push('salFrom', 'salTo');
                break;
            }
            case 2: {
                requiredFields.push('salFrom');
                break;
            }
            case 3: {
                requiredFields.push('salTo');
                break;
            }
			default:
				break;
        };

		const isRequireMultiValue = (key) => {
			const checkValid = Array.isArray(candidateInfos[key]) && candidateInfos[key]?.map(item => item?.value);
			if(checkValid.length > 0) return true;
		};

        requiredFields.forEach((name) => {
            if (_.isEmpty(candidateInfos[name]) || (!candidateInfos[name].value && optionFields.includes(name))) {
                _errors[name] = '* Bắt buộc';
            }
			if(checkVersionPnLSameAsVinhome() && name === 'postChannel' && !isRequireMultiValue(name)){
				_errors[name] = '* Bắt buộc';
			}else if(name === 'postChannel') {
				_errors[name] = null;
			}
            if(name == 'quantity' && (candidateInfos[name] == '' || candidateInfos[name] <= 0)) {
                _errors[name] = '* Bắt buộc giá trị > 0'
            } else if(name == 'quantity') {
                _errors[name] = null;
            }
        });
        let errorField = null;
        if(!_.isEmpty(candidateInfos['department'])) {
            candidateInfos.field.forEach(option => {
                if(option.value == candidateInfos['department'].value) {
                    errorField = 'Không được trùng với ngành nghê';
                }
            })
            errors.field = errorField;
        }


        if (!_errors.phone) {
            if (/^\d+$/.test(candidateInfos.phone) == false) {
                _errors.phone = 'Định dạng số điện thoại không đúng';
            }
        }

        if(!_errors.email) {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(candidateInfos.email) == false) {
                _errors.email = 'Sai định dạng email'
            }
        }

        setErrors(_errors);
        return _errors;
    }

    const isValidData = () => {
        const _errors = verifyInputs()
        const hasErrors = !Object.values(_errors).every(item => item === null)
        return hasErrors ? false : true
    }


    const handleSubmit = e => {
        e.preventDefault();
        if (!isValidData()) return;

        const endData = {
					id: data.id,
					title: data.position,
					mainCategory: _.pick(data.department, ['code', 'name']),
					categories: data.field.map(ele => _.pick(ele, ['code', 'name'])),
					location: {
						locations: [_.pick(data.workAddress, ['code', 'name'])],
						address: data.detailAddress
					},
					experience: data.exp.value,
					quantity: data.quantity,
					gender: data.sex.value,
					skills: data.skill.map(ele => _.pick(ele, ['code', 'name'])),
					salaryLevel: data.salaryType.value || '',
					salaryFrom: data.salFrom || '',
					salaryTo: data.salTo || '',
					salaryCurrency: data.unit.value,
					type: _.pick(data.jobType, ['code', 'name']),
					employeeLevel: _.pick(data.rank, ['code', 'name']),
					jobRequirement: data.requirement,
					jobBenefit: data.benefit,
					deadline: moment(data.deadline, 'DD/MM/YYYY').format('YYYY-MM-DD'),
					contactEmail: data.email,
					contactPhone: data.phone,
					contactName: data.contact,
					jobTagIds: data.jobTags.map(ele => _.pick(ele, ['code', 'name'])),
					jobDescription: data.jobDescription,
					companyCode: localStorage.getItem('companyCode'),
					listSource: checkVersionPnLSameAsVinhome() ? data.postChannel?.map(item => item?.value) : null
        };
        props.onSubmit(endData);
    }

    const handleChangeTextAreaInputs = (e, editor, name) => {
        if (editor === undefined || editor === null)
            return;
        const _data = editor.getData();
        const candidateInfos = { ...data };
        candidateInfos[name] = _data;
        setData(candidateInfos);
    }

    const handleTextInputChange = (e, name) => {
        const candidateInfos = { ...data };
        candidateInfos[name] = e != null ? e.target.value : ""
        setData(candidateInfos);
    }

    const handleDatePickerInputChange = (value, name) => {
        const candidateInfos = { ...data }
        if (moment(value, 'DD/MM/YYYY').isValid()) {
            const date = moment(value).format('DD/MM/YYYY')
            candidateInfos[name] = date
        } else {
            candidateInfos[name] = ''
        }
        setData(candidateInfos);
    }

    return (
			<>
				<LoadingModal show={modal.isShowLoadingModal} />
				<StatusModal show={modal.isShowStatusModal} textContent={modal.textContentStatusModal} isSuccess={modal.isSuccessStatusModal} onHide={hideStatusModal} />
				<Modal enforceFocus={false} className='action-modal' centered show={props.show}>
				<Modal.Header>
					{checkVersionPnLSameAsVinhome() ? <span className="sigle-text-header">{title}</span> : <>
						<span className="ic-header"><Image src={IconEmailWhite} alt="Note" /></span>
						<span className="sigle-text-header">{title}</span>
						<span className="ic-line-header"><Image src={IconLineHeaderModal} alt="Line" className="ic-line" /></span>
					</>}
				</Modal.Header>
				
				<Modal.Body>
					{checkVersionPnLSameAsVinhome() ? <RecruitmentVinHome 
						data={data}
						initData={props.initData} 
						genderOptions={GenderOptions} 
						currencyOptions={CurrencyOptions}
						postChannelOptions={isInternalRecruit ? PostChannelOptionsInternal : PostChannelOptions}
						handleTextInputChange={handleTextInputChange}
						handleChangeSelectInputs={handleChangeSelectInputs}
						handleChangeSelectMultiInputs={handleChangeSelectMultiInputs}
						handleDatePickerInputChange={handleDatePickerInputChange}
						handleChangeTextAreaInputs={handleChangeTextAreaInputs}
						errors={errors}
						showErrors={showErrors}
					/> : 
					<form className="create-template-campain-modal">
						<div className="row-customize">
							<div className="item pt-0">
								<label htmlFor="i_full_name" className="col-form-label">{'Vị trí tuyển dụng'}<span className="required">(*)</span></label>
								<div className="input">
									<input type="text" className="form-control" name="i_full_name" placeholder={'Nhập'} value={data.position}
										onChange={e => handleTextInputChange(e, "position")} autoComplete="off" />
									{errors.position ? showErrors('position') : null}
								</div>
							</div>
							<div className="item pt-0">
								<label htmlFor="i_full_name" className="col-form-label">{'Ngành nghề'}<span className="required">(*)</span></label>
								<div className="input">
									<Select options={props.initData.categories} placeholder={'Lựa chọn'} isClearable={false} noOptionsMessage={() => "Không có lựa chọn"}
										value={props.initData.categories.filter(g => g.value == data.department?.value)}
										onChange={e => handleChangeSelectInputs(e, 'department')} className="input"
										name="i_tongiao" styles={{ menu: provided => ({ ...provided, zIndex: 2 }) }} />
									{errors.department ? showErrors('department') : null}
								</div>
							</div>
						</div>

						<div className="row-customize">
							<div className="item">
								<label htmlFor="i_full_name" className="col-form-label">{'Ngành nghề phụ'}</label>
								<div className="input">
									<Select options={props.initData.categories} placeholder={'Lựa chọn'} isClearable={true} noOptionsMessage={() => "Không có lựa chọn"}
										value={data.field}
										onChange={e => handleChangeSelectMultiInputs(e, 'field')} className="input"
										isMulti
										hideSelectedOptions={false}
										closeMenuOnSelect={false}
										name="i_tongiao" styles={{ menu: provided => ({ ...provided, zIndex: 2 }) }} />
									{errors.field ? showErrors('field') : null}
								</div>
							</div>
							<div className="item">
								<label htmlFor="i_full_name" className="col-form-label">{'Địa điểm làm việc'}<span className="required">(*)</span></label>
								<div className="input">
									<Select options={props.initData.addresses} placeholder={'Lựa chọn'} isClearable={false} noOptionsMessage={() => "Không có lựa chọn"}
										value={props.initData.addresses.filter(g => g?.value == data.workAddress?.value)}
										onChange={e => handleChangeSelectInputs(e, 'workAddress')} className="input"
										name="i_tongiao" styles={{ menu: provided => ({ ...provided, zIndex: 2 }) }} />
									{errors.workAddress ? showErrors('workAddress') : null}
								</div>
							</div>
						</div>

						<div className="row-customize">
							<div className="item single pt-0">
								<label htmlFor="i_currentAddress_address" className="col-form-label">{'Vị trí cụ thể'}</label>
								<div className="input">
									<input type="text" className="form-control" name="i_full_name" placeholder={'Nhập'} value={data.detailAddress}
										onChange={e => handleTextInputChange(e, "detailAddress")} autoComplete="off" />
								</div>
							</div>
						</div>

						<div className="row-customize">
							<div className="item">
								<label htmlFor="i_full_name" className="col-form-label">{'Loại hình công việc'}<span className="required">(*)</span></label>
								<div className="input">
									<Select options={props.initData.jobType} placeholder={'Lựa chọn'} isClearable={false} noOptionsMessage={() => "Không có lựa chọn"}
										value={props.initData.jobType.filter(g => g.value == data.jobType.value)}
										onChange={e => handleChangeSelectInputs(e, 'jobType')} className="input"
										name="i_tongiao" styles={{ menu: provided => ({ ...provided, zIndex: 2 }) }} />
									{errors.jobType ? showErrors('jobType') : null}
								</div>
							</div>
							<div className="item">
								<label htmlFor="i_full_name" className="col-form-label">{'Nhóm công việc'}</label>
								<div className="input">
									<Select options={props.initData.jobTags} placeholder={'Lựa chọn'} isClearable={true} noOptionsMessage={() => "Không có lựa chọn"}
									value={data.jobTags}
									onChange={e => handleChangeSelectMultiInputs(e, 'jobTags')} className="input"
									isMulti
									hideSelectedOptions={false}
									closeMenuOnSelect={false}
										name="i_tongiao" styles={{ menu: provided => ({ ...provided, zIndex: 2 }) }} />
									{errors.rank ? showErrors('rank') : null}
								</div>
							</div>
						</div>
						<div className="row-customize">
							<div className="item">
								<label htmlFor="i_full_name" className="col-form-label">{'Cấp bậc'}<span className="required">(*)</span></label>
								<div className="input">
									<Select options={props.initData.employeeLevels} placeholder={'Lựa chọn'} isClearable={false} noOptionsMessage={() => "Không có lựa chọn"}
										value={props.initData.employeeLevels.filter(g => g.value == data.rank.value)}
										onChange={e => handleChangeSelectInputs(e, 'rank')} className="input"
										name="i_tongiao" styles={{ menu: provided => ({ ...provided, zIndex: 2 }) }} />
									{errors.rank ? showErrors('rank') : null}
								</div>
							</div>
							<div className="item">
								<label htmlFor="i_department" className="col-form-label">{'Kinh nghiệm'}<span className="required">(*)</span></label>
								<div className="input">
									<Select options={props.initData.expLevels} placeholder={'Lựa chọn'} isClearable={false} noOptionsMessage={() => "Không có lựa chọn"}
										value={props.initData.expLevels.filter(g => g.value == data.exp.value)}
										onChange={e => handleChangeSelectInputs(e, 'exp')} className="input"
										name="i_tongiao" styles={{ menu: provided => ({ ...provided, zIndex: 2 }) }} />
									{errors.exp ? showErrors('exp') : null}
								</div>
							</div>
						</div>

						<div className="row-customize">

							<div className="item">
								<label htmlFor="i_address" className="col-form-label">{'Số lượng'}<span className="required">(*)</span></label>
								<div className="input">
									<input type="number" className="form-control" name="i_full_name" placeholder={'Nhập'} value={data.quantity}
										onChange={e => handleTextInputChange(e, "quantity")} autoComplete="off" />
									{errors.quantity ? showErrors('quantity') : null}
								</div>
							</div>

							<div className="item">
								<label htmlFor="i_address" className="col-form-label">{'Giới tính'}</label>
								<div className="input">
									<Select options={GenderOptions} placeholder={'Lựa chọn'} isClearable={false} noOptionsMessage={() => "Không có lựa chọn"}
										value={GenderOptions.filter(g => g.value == data.sex.value)}
										onChange={e => handleChangeSelectInputs(e, 'sex')} className="input"
										name="i_tongiao" styles={{ menu: provided => ({ ...provided, zIndex: 2 }) }} />
								</div>
							</div>

						</div>

						<div className="row-customize">
							<div className="item single pt-0">
								<label htmlFor="i_currentAddress_address" className="col-form-label">{'Mô tả công việc'} <span className="required">(*)</span></label>
								<div className="input">
								<CKEditor
										config={{
											extraPlugins : 'autogrow',
											autoGrow_onStartup : true,
											allowedContent: true,
											removeButtons : 'Image',
											toolbar: [  { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', '-'] } ]
										}}
										className="editor"
										data={data.jobDescription || ''}
										placeholderText='Nhập nội dung'
										placeholder="Nhập nội dung"
										onChange={(e) => handleChangeTextAreaInputs(e, e.editor, 'jobDescription')}
									/>
									{/* <textarea className="form-control" name="i_content" id="i_content" rows="3" placeholder="Nhập nội dung"
										value={data.jobDescription} onChange={e => handleTextInputChange(e, 'jobDescription')} autoComplete="off"></textarea> */}
										{errors.jobDescription ? showErrors('jobDescription') : null}

								</div>
							</div>
						</div>

						<div className="row-customize">
							<div className="item single pt-0">
								<label htmlFor="i_currentAddress_address" className="col-form-label">{'Yêu cầu tương ứng'} <span className="required">(*)</span></label>
								<div className="input">
								<CKEditor
										config={{
											extraPlugins : 'autogrow',
											autoGrow_onStartup : true,
											allowedContent: true,
											removeButtons : 'Image',
											toolbar: [  { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', '-'] } ]
										}}
										className="editor"
										data={data.requirement || ''}
										placeholderText='Nhập nội dung'
										placeholder="Nhập nội dung"
										onChange={(e) => handleChangeTextAreaInputs(e, e.editor, 'requirement')}
									/>
									{errors.requirement ? showErrors('requirement') : null}
								</div>
							</div>
						</div>

						<div className="row-customize">
							<div className="item single pt-0">
								<label htmlFor="i_currentAddress_address" className="col-form-label">{'Lợi ích'}<span className="required">(*)</span></label>
								<div className="input">
								<CKEditor
										config={{
											extraPlugins : 'autogrow',
											autoGrow_onStartup : true,
											allowedContent: true,
											removeButtons : 'Image',
											toolbar: [  { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', '-'] } ]
										}}
										className="editor"
										data={data.benefit || ''}
										placeholderText='Nhập nội dung'
										placeholder="Nhập nội dung"
										onChange={(e) => handleChangeTextAreaInputs(e, e.editor, 'benefit')}
									/>
										{errors.benefit ? showErrors('benefit') : null}
								</div>
							</div>
						</div>

						<div className="row-customize">
							<div className="item">
								<label htmlFor="i_full_name" className="col-form-label">{'Kỹ năng'}</label>
								<div className="input">
									<Select options={props.initData.skills} placeholder={'Lựa chọn'} isClearable={true} noOptionsMessage={() => "Không có lựa chọn"}
										value={data.skill}
										onChange={e => handleChangeSelectMultiInputs(e, 'skill')} className="input"
										isMulti
										hideSelectedOptions={false}
										closeMenuOnSelect={false}
										name="i_tongiao" styles={{ menu: provided => ({ ...provided, zIndex: 2 }) }} />
								</div>
							</div>
							<div className="item">
								<label htmlFor="i_full_name" className="col-form-label">{'Hạn hoàn thành'}<span className="required">(*)</span></label>
								<div className="input">
									<DatePicker
										name="i_ngayhethan"
										dateFormat="dd/MM/yyyy"
										showMonthDropdown={true}
										showYearDropdown={true}
										placeholderText={'Lựa chọn'}
										locale="vi"
										selected={data.deadline ? moment(data.deadline, 'DD/MM/YYYY').toDate() : null}
										onChange={ngayhethan => handleDatePickerInputChange(ngayhethan, "deadline")}
										autoComplete="off"

										className="form-control input" />
									{errors.deadline ? showErrors('deadline') : null}
								</div>
							</div>
						</div>


						<div className="row-customize">
							<div className="item">
								<label htmlFor="i_full_name" className="col-form-label">{'Email liên hệ'}<span className="required">(*)</span></label>
								<div className="input">
									<input type="text" className="form-control" name="i_full_name" placeholder={'Nhập'} value={data.email}
										onChange={e => handleTextInputChange(e, "email")} autoComplete="off" />
									{errors.email ? showErrors('email') : null}
								</div>
							</div>
							<div className="item">
								<label htmlFor="i_full_name" className="col-form-label">{'Người liên hệ'}<span className="required">(*)</span></label>
								<div className="input">
									<input type="text" className="form-control" name="i_full_name" placeholder={'Nhập'} value={data.contact}
										onChange={e => handleTextInputChange(e, "contact")} autoComplete="off" />
									{errors.contact ? showErrors('contact') : null}
								</div>
							</div>
						</div>

						<div className="row-customize">
							<div className="item">
								<label htmlFor="i_full_name" className="col-form-label">{'Số điện thoại'}<span className="required">(*)</span></label>
								<div className="input">
									<input type="text" className="form-control" name="i_full_name" placeholder={'Nhập'} value={data.phone}
										onChange={e => handleTextInputChange(e, "phone")} autoComplete="off" />
									{errors.phone ? showErrors('phone') : null}
								</div>
							</div>
							<div className="item">
								<label htmlFor="i_full_name" className="col-form-label">{'Ngoại tệ'}<span className="required">(*)</span></label>
								<div className="input">
									<Select options={CurrencyOptions} placeholder={'Lựa chọn'} isClearable={false} noOptionsMessage={() => "Không có lựa chọn"}
										value={CurrencyOptions.filter(g => g.value == data.unit.value)}
										onChange={e => handleChangeSelectInputs(e, 'unit')} className="input"
										name="i_tongiao" styles={{ menu: provided => ({ ...provided, zIndex: 2 }) }} />
									{errors.unit ? showErrors('unit') : null}
								</div>
							</div>
						</div>

						<div className="row-customize">
							<div className="item">
								<label htmlFor="i_department" className="col-form-label">{'Kiểu lương'}<span className="required">(*)</span></label>
								<div className="input">
									<Select options={props.initData.salaryLevels} placeholder={'Lựa chọn'} isClearable={false} noOptionsMessage={() => "Không có lựa chọn"}
										value={props.initData.salaryLevels.filter(g => g.value == data.salaryType.value)}
										onChange={e => handleChangeSelectInputs(e, 'salaryType')} className="input"
										name="i_tongiao" styles={{ menu: provided => ({ ...provided, zIndex: 2 }) }} />
										{errors.salaryType ? showErrors('salaryType') : null}
								</div>
							</div>
							<div className="item">
								<div className="date-row">
									<div className="item-on-right">
										<label htmlFor="i_address" className="col-form-label">{'Khoảng lương'}<span className="required">(*)</span></label>
										<div className="input">
											<input type="number" className="form-control" name="i_full_name" placeholder={'Từ'} value={data.salFrom}
												onChange={e => handleTextInputChange(e, "salFrom")} autoComplete="off" />
											{errors.salFrom ? showErrors('salFrom') : errors.salTo ? showErrors('salTo') : null}
										</div>
									</div>

									<div className="item-on-right">
										<label htmlFor="i_address" className="col-form-label invisible">{'den'}</label>
										<div className="input">
											<input type="number" className="form-control" name="i_full_name" placeholder={'Đến'} value={data.salTo}
												onChange={e => handleTextInputChange(e, "salTo")} autoComplete="off" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>}
					<div className="action-block1">
						<span className="btn-action btn-reset" onClick={props.onHide}>
							<Image src={IconReset} alt="Hủy" className="ic-action ic-reset" />
							<span>Hủy</span>
						</span>
						<span className="btn-action btn-accept" onClick={handleSubmit}>
							<Image src={IconAccept} alt="Thêm" className="ic-action ic-accept" />
							<span>Đồng ý</span>
						</span>
					</div>
				</Modal.Body>
				</Modal>
			</>
    )

}

export default CreateTemplateCampaignModal;
