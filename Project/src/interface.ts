export interface SearchFormData{
  start:string
  end:string
  price?:string
}
export const search=(formData:SearchFormData):void=>{
  console.log(formData)
}