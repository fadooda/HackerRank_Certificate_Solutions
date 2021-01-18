const Posts = require('../models/posts');
let indexer=0;

async function incrementIndexer(){
    await indexer++
}
async function getIndexer(){
    return await indexer
}
async function postBlog(post, cb){
    if (post.isPublished===true)
    {
        console.log('ispublished exists')
        post.publishedDate= Date.now()
        await Posts.create(post)
    }else{
        console.log('ispublished does not exist')
        await Posts.create(post)
    }
    cb()
}
// console.log()
// let receivedData=req.body
// let post = { isPublished: receivedData.isPublished,
//     title : receivedData.title,
//     author : receivedData.author,
//     timestamp: receivedData.timestamp,
//     publishedDate : receivedData.publishedDate,
//     id: await getIndexer()}
// console.log('here inside post')
// console.log(receivedData)
// if (receivedData.isPublished===true)
// {
//     post.publishedDate= Date.now()
//     Posts.create(post)
// }else{
//     Posts.create(post)
// }
// const obj =await Posts.findOne({
//     where: { 
//         id: await getIndexer()
//     }})
// await incrementIndexer()   
// await console.log( await obj)
// res.status(201).send(post);
module.exports = {
    post: async function (req, res) {
        let receivedData=req.body
        console.log('received Data=')
        console.log(receivedData)
        console.log('indexer=')
        console.log(await getIndexer())
        
        let post = { isPublished: receivedData.isPublished,
        title : receivedData.title,
        author : receivedData.author,
        timestamp: receivedData.timestamp,
        publishedDate : receivedData.publishedDate,
        id: await getIndexer()
        }

        console.log('post=====')
        console.log(post)

        await postBlog(post, async ()=>{
            const postobj =await Posts.findOne({
                where: { 
                id: await getIndexer()
            }})
            console.log('new stuff=====')
            console.log(  postobj)
        })


        await incrementIndexer()
        console.log('indexer===')
        console.log(indexer)
        res.status(201).send(post);
    },

    getAll: async function (req, res) {
        const queryAuthor = req.query.author
        const queryIsPublished = req.query.isPublished
        console.log('query Author =')
        console.log(queryAuthor)
        console.log('query Is Published =')
        console.log(queryIsPublished)
        console.log(':::::: GET ALL ::::::')
        let postobj
        if (queryAuthor&& (queryIsPublished==='true' || queryIsPublished==='false')){
            console.log(':::::::::here in query author and published::::')
            postobj = await Posts.findAll({
                where: { 
                    author: parseInt(queryAuthor),
                    isPublished: eval(queryIsPublished)
                }})
        }else if (queryAuthor){
            postobj = await Posts.findAll({
                where: { 
                    author: queryAuthor
                }})
        }else if (queryIsPublished  && (queryIsPublished==='true' || queryIsPublished==='false')){
            postobj = await Posts.findAll({
                where: { 
                    isPublished: queryIsPublished
                }})
        }else{
            postobj = await Posts.findAll()
        }
        console.log('postobj=')
        console.log(postobj)
        res.status(200).send(postobj);
    },
    
    invalid: function (req, res) {
        res.sendStatus(405)
    },

    getBlogPostById: async function (req, res) {
        console.log('::::: id :::::')
        console.log(req.params.id)
        let postobj =await Posts.findOne({
            where: { 
                id: req.params.id
            }})
        console.log('postobj=')
        console.log(postobj)
        if (postobj){
            res.status(200).send(postobj);
        }else{
            res.status(404).send('ID not found');
        }
    }
};
