

const getData = async () => {
    const request = await fetch("https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json");
    const data = await request.json();
    return data;
  };

  getData().then(result => {
    let name =""
    let movies1 =""
    let type =""
   
   document.write(` <div class="col-md-2"  style="height: 600px; overflow-y: scroll;" ><table class='table table-striped' > 
     <thead class="thead-dark"> <tr> <th colspan=2>Actors</th> 
     
     <th colspan=2>Genres</th> </thead>    
        <thead><tr style='background-color:white;'>
         <th>Names</th> <th scope='col'> Movies </th>   <th scope='col'> Type </th> 
         <th scope='col'>Movies</th>  </tr></thead>`);
        for(let i=0; i<result.length; i++){

          if (result[i].cast != null && result[i].cast != ""){
            name = result[i].cast
          }
          else{
            name ="N/A" 
          }

          if (result[i].genres != null && result[i].genres != ""){
            type = result[i].genres
          }
          else{
            type = "N/A" 
          }

          if (result[i].title != null && result[i].title != ""){
            movies1 = result[i].title
          }
          else{
            movies1 = "N/A"
          }


   document.write(`<tr class='design'> <td scope='row'> ${name} </td> <td scope='row'> ${movies1} </td> <td scope='row'> ${type} </td> <td scope='row'> ${movies1} </td> </tr>`);

      }

      document.write("</table></div>");
      
   

      
  }).catch((error)=>{
      document.write("Error");
  });