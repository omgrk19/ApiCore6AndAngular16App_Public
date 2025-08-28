
export interface IEmployee {
    userId: number,
    firstName: string,
    lastName: string,
    departmentId: number,
    designationId: number,
    designationName: string,
    departmentName: string,
    emailId: string,
    mobile: string,
    password: string,
    isMarried: boolean,
    gender: string,
    birthDate: Date,
    isActive: boolean,
    photoUrl: string,
    documentUrl: string,
    videoUrl: string,
    createdOn: Date,
    createdBy: string,
    modifiedOn: Date,
    modifiedBy: string,
    rowNo: number,

}

export interface IDepartment {
    id: number,
    departmentName: string    
}
export interface IDesignation {
    id: number,
    designationName: string    
}

export interface IManageDesignation {
    id: number,
    departmentId: number,
    departmentName: string,    
    designationId: number,
    designationName: string,
}

export interface IAuthForms {
    id: number,
    formid: string,
    form_name: string,    
    form_link: string,
    model_id: string,
    form_st: boolean,
}

export interface IAuthAction {
    id: number,
    action: string,    
}

export interface IAuthProfile {
    id: number,
    profileId: string,    
    profile_Name: string,    
    profile_Desc: string,    
    profile_St: boolean,    
}

export interface IAuthManageFormAction {
    id: number,
    formName: string,    
    formId: string,    
    actionId: string,    
}
export interface IAuthManageProfileFormAct {
    id: number,
    profileName: string,    
    formName: string,    
    profileId: string,    
    formId: string,    
    actionId: string,    
}

// export interface IEmployeeState {
//     employeeDetails_List: IEmployee[];
//     totalRecords: number;
//     pageNo: number;
//     pageSize: number;
//     totalPages: number;
//     loading: boolean;
//     loaded: boolean;
//     error: string;
// }