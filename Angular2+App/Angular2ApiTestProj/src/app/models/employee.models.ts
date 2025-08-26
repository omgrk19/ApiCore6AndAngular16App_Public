
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