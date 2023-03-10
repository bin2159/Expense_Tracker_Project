const Sib=require('sib-api-v3-sdk')
require('dotenv').config()
const client=Sib.ApiClient.instance

const apiKey=client.authentication['api-key']
apiKey.apikey=process.env.API_KEY

const tranEmailApi=new Sib.TransactionalEmailsApi()
const sender={
    email:'bipinthms007.bst@gmail.com'
}
const receiver=[
    {
        email:'bipinthms007@gmail.com'
    }
]
tranEmailApi.sendTransacEmail({
    sender,to:receivers,subject:'Subscribe to Cules Coding to become a developer',
    textContent:'cules Coding will teach you how to become a developer'
}).then(console.log)
.catch(console.log)

