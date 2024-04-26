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
      categorie:string
    }]