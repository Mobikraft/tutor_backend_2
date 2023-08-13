const cloudinary=require("cloudinary").v2;

exports.uploadToCloudinary= async (file,folder,height,quality)=>{
    const options={folder};
    if(quality){
        options.quality=quality
    }
    if(height){
        options.height=height
    }
    options.resource_type="auto"
       // Determine resource type based on mimetype
       if (file.mimetype.startsWith('video')) {
        options.resource_type = "video";
    } else if (file.mimetype.startsWith('image')) {
        options.resource_type = "image";
    } else if (file.mimetype === 'application/pdf') {
        options.resource_type = "raw"; // Treat PDF as raw document
    } else {
        throw new Error("Unsupported file type");
    }
   

    return cloudinary.uploader.upload(file.tempFilePath,options)

}