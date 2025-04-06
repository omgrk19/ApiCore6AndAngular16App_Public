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

  getToken(): any {

    if (localStorage.length > 0) {
      var data = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('localkey'))))
      return data.token;
    }
  }


  //employee
  getEmployee(id: any) {
    //let auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGVzdEB0ZXN0LmNvbSIsImp0aSI6IjhiMDE2NWNmLWI4OGQtNDJhMS1hZTAxLWJiNDFlNzJmMDVhNSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE3Mjk5NTc0OTIsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcwODQiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAifQ.9W1awZlQ2ywNVSGvBX5r_Kokx1fGlKctkXmeL2nRcVo';
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/Employee/${id}`, { headers: hdr });
  }
  getEmployeeList(pageNo: number, pageSize: number, id: any = 0, departmentId:any=0, designationId: any = 0, firstName: any = "", mobile: any = "") {

    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/Employee?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&firstName=${firstName}
      &mobile=${mobile}&departmentId=${departmentId}&designationId=${designationId}`
      , { headers: hdr }
    );
  }

  addEmployee(data: any) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.post<any>(`${this.cBaseUrl}/Employee`, data, { headers: hdr });
  }

  updateEmployee(id: number, data: any) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.put<any>(`${this.cBaseUrl}/Employee/${id}`, data, { headers: hdr });
  }

  deleteEmployee(id: any) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.delete<any>(`${this.cBaseUrl}/Employee/${id}`, { headers: hdr });
  }

  //update employee file path in db
  updateEmployeeFilePath(id: number, data: any) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.put<any>(`${this.cBaseUrl}/Employee/UpdateFile/${id}`, data, { headers: hdr });
  }
  //update employee file path in db, end
  //employee end

  //designation
  getDesigList() {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/Designation`, { headers: hdr });
  }


  getDesigsWithPage(pageNo: number, pageSize: number, id: any = 0, designationId: any = 0, designationName: any = "") {

    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/Designation?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&designationName=${designationName}&designationId=${designationId}`
      , { headers: hdr }
    );
  }


  getDesig(id: number) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/Designation/${id}`, { headers: hdr });
  }

  postDesig(data: any) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.post<any>(`${this.cBaseUrl}/Designation`, data, { headers: hdr });
  }

  putDesig(id: number, data: any) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.put<any>(`${this.cBaseUrl}/Designation/${id}`, data, { headers: hdr });
  }

  deleteDesig(id: number) {
    debugger
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.delete<any>(`${this.cBaseUrl}/Designation/${id}`, { headers: hdr });
  }

  //designation end


  //department
  getDeptList() {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/Department`, { headers: hdr });
  }


  getDeptWithPage(pageNo: number, pageSize: number, id: any = 0, designationId: any = 0, designationName: any = "") {

    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/Department?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&designationName=${designationName}&designationId=${designationId}`
      , { headers: hdr }
    );
  }


  getDept(id: number) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/Department/${id}`, { headers: hdr });
  }

  postDept(data: any) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.post<any>(`${this.cBaseUrl}/Department`, data, { headers: hdr });
  }

  putDept(id: number, data: any) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.put<any>(`${this.cBaseUrl}/Department/${id}`, data, { headers: hdr });
  }

  deleteDept(id: number) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.delete<any>(`${this.cBaseUrl}/Department/${id}`, { headers: hdr });
  }
  //department end

  //action
  getActionList() {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/AuthAction`, { headers: hdr });
  }


  getActionWithPage(pageNo: number, pageSize: number, id: any = 0, designationId: any = 0, action: any = "") {

    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/AuthAction?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&action=${action}`
      , { headers: hdr }
    );
  }


  getAction(id: number) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/AuthAction/${id}`, { headers: hdr });
  }

  postAction(data: any) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.post<any>(`${this.cBaseUrl}/AuthAction`, data, { headers: hdr });
  }

  putAction(id: number, data: any) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.put<any>(`${this.cBaseUrl}/AuthAction/${id}`, data, { headers: hdr });
  }

  deleteAction(id: number) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.delete<any>(`${this.cBaseUrl}/AuthAction/${id}`, { headers: hdr });
  }
  //action end

  //form mas
  getFormList() {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/AuthFormMas`, { headers: hdr });
  }


  getFormWithPage(pageNo: number, pageSize: number, id: any = 0, formid: any = "", form_name: any = "") {

    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/AuthFormMas?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&formid=${formid}`
      , { headers: hdr }
    );
  }


  getForm(id: number) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/AuthFormMas/${id}`, { headers: hdr });
  }

  postForm(data: any) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.post<any>(`${this.cBaseUrl}/AuthFormMas`, data, { headers: hdr });
  }

  putForm(id: number, data: any) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.put<any>(`${this.cBaseUrl}/AuthFormMas/${id}`, data, { headers: hdr });
  }

  deleteForm(id: number) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.delete<any>(`${this.cBaseUrl}/AuthFormMas/${id}`, { headers: hdr });
  }
  //form mas end

  //profile mas
  getProfileList() {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/AuthProfileMas`, { headers: hdr });
  }


  getProfileWithPage(pageNo: number, pageSize: number, id: any = 0, formid: any = "", form_name: any = "") {

    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/AuthProfileMas?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&formid=${formid}`
      , { headers: hdr }
    );
  }


  getProfile(id: number) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/AuthProfileMas/${id}`, { headers: hdr });
  }

  postProfile(data: any) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.post<any>(`${this.cBaseUrl}/AuthProfileMas`, data, { headers: hdr });
  }

  putProfile(id: number, data: any) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.put<any>(`${this.cBaseUrl}/AuthProfileMas/${id}`, data, { headers: hdr });
  }

  deleteProfile(id: number) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.delete<any>(`${this.cBaseUrl}/AuthProfileMas/${id}`, { headers: hdr });
  }
  //profile mas end


  //user mas

  getUserList() {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/AuthUser`, { headers: hdr });
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

    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/AuthManageFormAction?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&formid=${formId}&actionId=${actionId}`
      , { headers: hdr }
    );
  }


  getManageFormAction(id: number) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/AuthManageFormAction/${id}`, { headers: hdr });
  }

  postManageFormAction(data: any) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.post<any>(`${this.cBaseUrl}/AuthManageFormAction`, data, { headers: hdr });
  }


  deleteManageFormAction(id: number) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.delete<any>(`${this.cBaseUrl}/AuthManageFormAction/${id}`, { headers: hdr });
  }
  //manage form action end


  //manage profile form action 
  getManageProfileFormActionWithPage(pageNo: number, pageSize: number, id: any = 0, profileId: string = "", formId: any = "", actionId: any = 0) {

    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/AuthManageProfileFormAction?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&profileId=${profileId}&formid=${formId}&actionId=${actionId}`
      , { headers: hdr }
    );
  }


  getManageProfileFormAction(id: number) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/AuthManageProfileFormAction/${id}`, { headers: hdr });
  }

  postManageProfileFormAction(data: any) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.post<any>(`${this.cBaseUrl}/AuthManageProfileFormAction`, data, { headers: hdr });
  }


  deleteManageProfileFormAction(id: number) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.delete<any>(`${this.cBaseUrl}/AuthManageProfileFormAction/${id}`, { headers: hdr });
  }
  //manage profile form action end

  //manage user profile form action
  getManageUserProfileFormActionWithPage(pageNo: number, pageSize: number, id: any = 0, userId: string = "", profileId: string = "", formId: any = "", actionId: any = 0) {

    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/AuthManageUserProfileFormAction?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&userId=${userId}&profileId=${profileId}&formid=${formId}&actionId=${actionId}`
      , { headers: hdr }
    );
  }


  getManageUserProfileFormAction(id: number) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/AuthManageUserProfileFormAction/${id}`, { headers: hdr });
  }

  postManageUserProfileFormAction(data: any) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.post<any>(`${this.cBaseUrl}/AuthManageUserProfileFormAction`, data, { headers: hdr });
  }


  deleteManageUserProfileFormAction(id: number) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.delete<any>(`${this.cBaseUrl}/AuthManageUserProfileFormAction/${id}`, { headers: hdr });
  }
  //manage user profile form action end

  //manage department designtion  
  getManageDesignationWithPage(pageNo: number, pageSize: number, id: any = 0, departmentId: string = "", designationId: string = "") {

    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/ManageDesignation?pageNo=${pageNo}&pageSize=${pageSize}&id=${id}&departmentId=${departmentId}&designationId=${designationId}`
      , { headers: hdr }
    );
  }


  getManageDesignation(id: number) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.get<any>(`${this.cBaseUrl}/ManageDesignation/${id}`, { headers: hdr });
  }

  postManageDesignation(data: any) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.post<any>(`${this.cBaseUrl}/ManageDesignation`, data, { headers: hdr });
  }


  deleteManageDesignation(id: number) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.delete<any>(`${this.cBaseUrl}/ManageDesignation/${id}`, { headers: hdr });
  }
  //manage department designtion end


  //update user file path in db
  updateUserFilePath(data: any) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.http.put<any>(`${this.cBaseUrl}/Account2/UpdatePhotoData`, data, { headers: hdr });
  }
  //update user file path in db, end


  //upload files
  uploadImage(id: any, Image: File) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      // 'Content-Type': 'application/json',      
      'Authorization': `Bearer ${auth_token}`
    });

    const formData: FormData = new FormData();
    formData.append("Image", Image, Image.name)
    return this.http.post<any>(`${this.cBaseUrl}/UploadingFiles/image/${id}`, formData, { headers: hdr })
  }
  //upload files
  uploadImageNew(id: any, Image: File) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      // 'Content-Type': 'application/json',      
      'Authorization': `Bearer ${auth_token}`
    });

    const formData: FormData = new FormData();
    formData.append("Image", Image, Image.name)
    return this.http.post<any>(`${this.cBaseUrl}/UploadingFiles/imageNew/${id}`, formData, { headers: hdr })
  }
  //upload files
  uploadImageUser(Image: File) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      // 'Content-Type': 'application/json',      
      'Authorization': `Bearer ${auth_token}`
    });

    const formData: FormData = new FormData();
    formData.append("Image", Image, Image.name)
    return this.http.post<any>(`${this.cBaseUrl}/UploadingFiles/imageNew`, formData, { headers: hdr })
  }

  uploadDocument(id: any, Doc: File) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    const formData: FormData = new FormData();
    formData.append("Doc", Doc, Doc.name)
    return this.http.post<any>(`${this.cBaseUrl}/UploadingFiles/doc/${id}`, formData, { headers: hdr })
  }

  uploadVideo(id: any, Video: File) {
    let auth_token = this.getToken();
    const hdr = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    const formData: FormData = new FormData();
    formData.append("Video", Video, Video.name)
    return this.http.post<any>(`${this.cBaseUrl}/UploadingFiles/video/${id}`, formData, { headers: hdr })
  }
  //upload files end


  UserLogin(data: any) {
    return this.http.post<any>(`${this.cBaseUrl}/Account2/login`, data);
  }

  UserRegister(data: any) {
    return this.http.post<any>(`${this.cBaseUrl}/Account2/register`, data);
  }


}
