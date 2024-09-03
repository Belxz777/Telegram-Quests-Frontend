type augedInfo =  {
    ip:number,
    lat:number,
    lon: number,
    }
    type QuizData =[ {
      id:number,
      question:string,
      answer:string,
      variants:string[],
      location: string,
      hardness:string,
      lat:number,
      lon: number,
      author:string,
      quizIn: string, 
      quizId:number,
      categorie:string,
      image:string,
      rebus:boolean,
      todo:boolean,
    }]
    type Team = {

        id: number,
        name: string,
        solved:Array<string>,
        results: Array<string>,
      imageDataUrl:Array<string>,
      answers:Array<string>
    }
    type someError = {
      message:string,
      statusCode:number,
    }
  