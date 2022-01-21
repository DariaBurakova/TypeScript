export interface SearchFormData{
  start:string
  end:string
  price?:number
}
export const search=(item:SearchFormData)=>{
  console.log(item)
}