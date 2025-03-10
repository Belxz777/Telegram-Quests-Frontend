export type augedInfo =  {
    ip:number,
    lat:number,
    lon: number,
    }
 export type QuizData =[ {
      id:number,
      question:string,
      answer:string ,
      variants:string[] ,
     location:LocationData,
      image:string ,
      rebus:boolean,
      todo:boolean,
    }]
    export type LocationData = {
      id:number,
      lat:number,
      lon: number,
      name: string,
      description:string,

    }
    export type Quiz ={
      question:string,
      answer:string ,
      variants:string[] ,
      lat:number | string,
    lon: number | string,
      quizIn: string, 
      quizId:number,
      image:string ,
      rebus:boolean,
      todo:boolean,
    }
   export type Team = {

        id: number,
        name: string,
        solved:Array<string>,
        results: Array<string>,
      imageDataUrl:Array<string>,
      answers:Array<string>
    }
   export type someError = {
      message:string,
      statusCode:number,
    }
  