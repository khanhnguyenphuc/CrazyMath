function sharePhoto() {
    window.plugins.screenshot.save(function(error,res){
          if(error){
            alert(error);
          }else{
            alert('ok',res.filePath); //should be path/to/myScreenshot.jpg
          }
        },'jpg',50,'myScreenShot');
}