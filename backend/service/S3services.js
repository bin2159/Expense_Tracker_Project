const AWS=require('aws-sdk')
const uploadToS3=(data,filename)=>{
    const BUCKET_NAME='expensetracker2159'
    const IAM_USER_KEY=process.env.IAM_USER_KEY
    const IAM_USER_SECRET=process.env.IAM_USER_SECRET
    let s3bucket=new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
    })
    // s3bucket.createBucket(()=>{})
        let params={
            Bucket:BUCKET_NAME,
            Key:filename,
            Body:data,
            ACL:'public-read'
        }
        return new Promise((resolve,reject)=>{
            s3bucket.upload(params,(err,res)=>{
                if(err){
                    console.log('Something WEnt Wrong',err)
                    reject(err)
                }
                else{
                    console.log('Success',res)
                    resolve(res.Location)
                }
            })
        })    
}
module.exports={uploadToS3}