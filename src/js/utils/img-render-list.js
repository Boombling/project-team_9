export default function createsDownloadList(lists){

    const listOfRendr = [];
    lists.map(list =>{
      const listsUrl = list.images.filter(img =>
               String(img.url).includes('RETINA_PORTRAIT_3_2'));

             const newRenderEventList ={
                imag: listsUrl[0].url,
                event: list,
             }
             listOfRendr.push(newRenderEventList);
        
 
      })
    return listOfRendr;
 }



