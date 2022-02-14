//const url:string='https://jsonplaceholder.typicode.com/todos'

export interface List{
    title:string,
    completed:boolean
    [key:number]:number|any

}
 export function getTodosByCount(count:number){
    
            return fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response=>response.text())
            .then<List>((response) => {
                return JSON.parse(response)
                
              })
            .then((data)=>{
               for( let i=0;i<count;++i){
                 console.log(data[i].title,data[i].completed)
               } 
                })
            .catch((error) => {
                console.log(error)
              })
             
        }

    