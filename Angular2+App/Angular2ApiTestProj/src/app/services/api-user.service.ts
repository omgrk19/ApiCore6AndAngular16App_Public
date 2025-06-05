import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiBaseUrlService } from './api-base-url.service';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  private httpClient: HttpClient;
  //private cBaseUrl:string = "https://localhost:7084/api"; 
  private cBaseUrl: string;
  //private auth_token:string

  constructor(private http: HttpClient, private handler: HttpBackend, private apiBaseUrlService: ApiBaseUrlService) {

    this.httpClient = new HttpClient(handler);
    this.cBaseUrl = apiBaseUrlService.baseUrl;


  }




  //employee
  getEmployee(id: any) {
    return this.http.get<any>(`${this.cBaseUrl}/Employee/${id}`);
  }
  getEmployeeList(pageNo: number, pageSize: number, id: any = 0, departmentId: any = 0, designationId: any = 0, firstName: any = "", mobile: any = "") {

    return this.http.get<any>(`${this.cBaseUrl}/Employee?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&firstName=${firstName}
      &mobile=${mobile}&departmentId=${departmentId}&designationId=${designationId}`
    );
  }

  addEmployee(data: any) {

    return this.http.post<any>(`${this.cBaseUrl}/Employee`, data);
  }

  updateEmployee(id: number, data: any) {

    return this.http.put<any>(`${this.cBaseUrl}/Employee/${id}`, data);
  }

  deleteEmployee(id: any) {

    return this.http.delete<any>(`${this.cBaseUrl}/Employee/${id}`);
  }

  //update employee file path in db
  updateEmployeeFilePath(id: number, data: any) {

    return this.http.put<any>(`${this.cBaseUrl}/Employee/UpdateFile/${id}`, data);
  }
  //update employee file path in db, end
  //employee end

  //designation
  getDesigList() {

    return this.http.get<any>(`${this.cBaseUrl}/Designation`);
  }


  getDesigsWithPage(pageNo: number, pageSize: number, id: any = 0, designationId: any = 0, designationName: any = "") {

    return this.http.get<any>(`${this.cBaseUrl}/Designation?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&designationName=${designationName}&designationId=${designationId}`

    );
  }


  getDesig(id: number) {

    return this.http.get<any>(`${this.cBaseUrl}/Designation/${id}`);
  }

  postDesig(data: any) {

    return this.http.post<any>(`${this.cBaseUrl}/Designation`, data);
  }

  putDesig(id: number, data: any) {

    return this.http.put<any>(`${this.cBaseUrl}/Designation/${id}`, data);
  }

  deleteDesig(id: number) {

    return this.http.delete<any>(`${this.cBaseUrl}/Designation/${id}`);
  }

  //designation end


  //department
  getDeptList() {

    return this.http.get<any>(`${this.cBaseUrl}/Department`);
  }


  getDeptWithPage(pageNo: number, pageSize: number, id: any = 0, designationId: any = 0, designationName: any = "") {


    return this.http.get<any>(`${this.cBaseUrl}/Department?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&designationName=${designationName}&designationId=${designationId}`

    );
  }


  getDept(id: number) {

    return this.http.get<any>(`${this.cBaseUrl}/Department/${id}`);
  }

  postDept(data: any) {

    return this.http.post<any>(`${this.cBaseUrl}/Department`, data);
  }

  putDept(id: number, data: any) {

    return this.http.put<any>(`${this.cBaseUrl}/Department/${id}`, data);
  }

  deleteDept(id: number) {

    return this.http.delete<any>(`${this.cBaseUrl}/Department/${id}`);
  }
  //department end

  //action
  getActionList() {

    return this.http.get<any>(`${this.cBaseUrl}/AuthAction`);
  }


  getActionWithPage(pageNo: number, pageSize: number, id: any = 0, designationId: any = 0, action: any = "") {

    return this.http.get<any>(`${this.cBaseUrl}/AuthAction?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&action=${action}`
    );
  }


  getAction(id: number) {

    return this.http.get<any>(`${this.cBaseUrl}/AuthAction/${id}`);
  }

  postAction(data: any) {

    return this.http.post<any>(`${this.cBaseUrl}/AuthAction`, data);
  }

  putAction(id: number, data: any) {

    return this.http.put<any>(`${this.cBaseUrl}/AuthAction/${id}`, data);
  }

  deleteAction(id: number) {

    return this.http.delete<any>(`${this.cBaseUrl}/AuthAction/${id}`);
  }
  //action end

  //form mas
  getFormList() {

    return this.http.get<any>(`${this.cBaseUrl}/AuthFormMas`);
  }


  getFormWithPage(pageNo: number, pageSize: number, id: any = 0, formid: any = "", form_name: any = "") {

    return this.http.get<any>(`${this.cBaseUrl}/AuthFormMas?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&formid=${formid}`

    );
  }


  getForm(id: number) {

    return this.http.get<any>(`${this.cBaseUrl}/AuthFormMas/${id}`);
  }

  postForm(data: any) {

    return this.http.post<any>(`${this.cBaseUrl}/AuthFormMas`, data);
  }

  putForm(id: number, data: any) {

    return this.http.put<any>(`${this.cBaseUrl}/AuthFormMas/${id}`, data);
  }

  deleteForm(id: number) {

    return this.http.delete<any>(`${this.cBaseUrl}/AuthFormMas/${id}`);
  }
  //form mas end

  //profile mas
  getProfileList() {

    return this.http.get<any>(`${this.cBaseUrl}/AuthProfileMas`);
  }


  getProfileWithPage(pageNo: number, pageSize: number, id: any = 0, formid: any = "", form_name: any = "") {


    return this.http.get<any>(`${this.cBaseUrl}/AuthProfileMas?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&formid=${formid}`

    );
  }


  getProfile(id: number) {

    return this.http.get<any>(`${this.cBaseUrl}/AuthProfileMas/${id}`);
  }

  postProfile(data: any) {

    return this.http.post<any>(`${this.cBaseUrl}/AuthProfileMas`, data);
  }

  putProfile(id: number, data: any) {

    return this.http.put<any>(`${this.cBaseUrl}/AuthProfileMas/${id}`, data);
  }

  deleteProfile(id: number) {

    return this.http.delete<any>(`${this.cBaseUrl}/AuthProfileMas/${id}`);
  }
  //profile mas end


  //user mas

  getUserList() {

    return this.http.get<any>(`${this.cBaseUrl}/AuthUser`);
  }


  // getUserWithPage(pageNo: number, pageSize: number, id: any = 0, formid: any = "", form_name: any = "") {

  //   let auth_token = this.getToken();
  //   const hdr = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${auth_token}`
  //   });
  //   return this.http.get<any>(`${this.cBaseUrl}/AuthUser?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&formid=${formid}`
  //     , { headers: hdr }
  //   );
  // }

  // getProfile(id: number) {
  //   let auth_token = this.getToken();
  //   const hdr = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${auth_token}`
  //   });
  //   return this.http.get<any>(`${this.cBaseUrl}/AuthProfileMas/${id}`, { headers: hdr });
  // }

  // postProfile(data: any) {
  //   let auth_token = this.getToken();
  //   const hdr = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${auth_token}`
  //   });
  //   return this.http.post<any>(`${this.cBaseUrl}/AuthProfileMas`, data, { headers: hdr });
  // }

  // putProfile(id: number, data: any) {
  //   let auth_token = this.getToken();
  //   const hdr = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${auth_token}`
  //   });
  //   return this.http.put<any>(`${this.cBaseUrl}/AuthProfileMas/${id}`, data, { headers: hdr });
  // }

  // deleteProfile(id: number) {
  //   let auth_token = this.getToken();
  //   const hdr = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${auth_token}`
  //   });
  //   return this.http.delete<any>(`${this.cBaseUrl}/AuthProfileMas/${id}`, { headers: hdr });
  // }
  //user mas end





  //manage form action   

  getManageFormActionWithPage(pageNo: number, pageSize: number, id: any = 0, formId: any = "", actionId: any = 0) {


    return this.http.get<any>(`${this.cBaseUrl}/AuthManageFormAction?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&formid=${formId}&actionId=${actionId}`

    );
  }


  getManageFormAction(id: number) {

    return this.http.get<any>(`${this.cBaseUrl}/AuthManageFormAction/${id}`);
  }

  postManageFormAction(data: any) {

    return this.http.post<any>(`${this.cBaseUrl}/AuthManageFormAction`, data);
  }


  deleteManageFormAction(id: number) {

    return this.http.delete<any>(`${this.cBaseUrl}/AuthManageFormAction/${id}`);
  }
  //manage form action end


  //manage profile form action 
  getManageProfileFormActionWithPage(pageNo: number, pageSize: number, id: any = 0, profileId: string = "", formId: any = "", actionId: any = 0) {

    return this.http.get<any>(`${this.cBaseUrl}/AuthManageProfileFormAction?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&profileId=${profileId}&formid=${formId}&actionId=${actionId}`

    );
  }


  getManageProfileFormAction(id: number) {

    return this.http.get<any>(`${this.cBaseUrl}/AuthManageProfileFormAction/${id}`);
  }

  postManageProfileFormAction(data: any) {

    return this.http.post<any>(`${this.cBaseUrl}/AuthManageProfileFormAction`, data);
  }


  deleteManageProfileFormAction(id: number) {

    return this.http.delete<any>(`${this.cBaseUrl}/AuthManageProfileFormAction/${id}`);
  }
  //manage profile form action end

  //manage user profile form action
  getManageUserProfileFormActionWithPage(pageNo: number, pageSize: number, id: any = 0, userId: string = "", profileId: string = "", formId: any = "", actionId: any = 0) {


    return this.http.get<any>(`${this.cBaseUrl}/AuthManageUserProfileFormAction?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&userId=${userId}&profileId=${profileId}&formid=${formId}&actionId=${actionId}`

    );
  }


  getManageUserProfileFormAction(id: number) {

    return this.http.get<any>(`${this.cBaseUrl}/AuthManageUserProfileFormAction/${id}`);
  }

  postManageUserProfileFormAction(data: any) {

    return this.http.post<any>(`${this.cBaseUrl}/AuthManageUserProfileFormAction`, data);
  }


  deleteManageUserProfileFormAction(id: number) {

    return this.http.delete<any>(`${this.cBaseUrl}/AuthManageUserProfileFormAction/${id}`);
  }
  //manage user profile form action end

  //manage department designtion  
  getManageDesignationWithPage(pageNo: number, pageSize: number, id: any = 0, departmentId: string = "", designationId: string = "") {

    return this.http.get<any>(`${this.cBaseUrl}/ManageDesignation?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&departmentId=${departmentId}&designationId=${designationId}`

    );
  }


  getManageDesignation(id: number) {

    return this.http.get<any>(`${this.cBaseUrl}/ManageDesignation/${id}`);
  }

  postManageDesignation(data: any) {

    return this.http.post<any>(`${this.cBaseUrl}/ManageDesignation`, data);
  }


  deleteManageDesignation(id: number) {

    return this.http.delete<any>(`${this.cBaseUrl}/ManageDesignation/${id}`);
  }
  //manage department designtion end


  //update user file path in db
  updateUserFilePath(data: any) {

    return this.http.put<any>(`${this.cBaseUrl}/Account2/UpdatePhotoData`, data);
  }
  //update user file path in db, end


  //upload files
  uploadImage(id: any, Image: File) {
    // const hdr = new HttpHeaders({
    //   // 'Content-Type': 'application/json',      
    //   'Authorization': `Bearer ${auth_token}`
    // });

    const formData: FormData = new FormData();
    formData.append("Image", Image, Image.name)
    return this.http.post<any>(`${this.cBaseUrl}/UploadingFiles/image/${id}`, formData
      //, { headers: hdr }
    )
  }

  

  //upload files
  uploadImageNew(id: any, Image: File) {    

    const formData: FormData = new FormData();
    formData.append("Image", Image, Image.name)
    return this.http.post<any>(`${this.cBaseUrl}/UploadingFiles/imageNew/${id}`, formData
    )
  }
  //upload files
  uploadImageUser(Image: File) {   

    const formData: FormData = new FormData();
    formData.append("Image", Image, Image.name)
    return this.http.post<any>(`${this.cBaseUrl}/UploadingFiles/imageNew`, formData    
    )
  }

  uploadDocument(id: any, Doc: File) {
    

    const formData: FormData = new FormData();
    formData.append("Doc", Doc, Doc.name)
    return this.http.post<any>(`${this.cBaseUrl}/UploadingFiles/doc/${id}`, formData)
  }

  uploadVideo(id: any, Video: File) {    

    const formData: FormData = new FormData();
    formData.append("Video", Video, Video.name)
    return this.http.post<any>(`${this.cBaseUrl}/UploadingFiles/video/${id}`, formData)
  }
  //upload files end


  UserLogin(data: any) {
    return this.http.post<any>(`${this.cBaseUrl}/Account2/login`, data);
  }

  UserRegister(data: any) {
    return this.http.post<any>(`${this.cBaseUrl}/Account2/register`, data);
  }


}
