import Joi from 'joi';

const bookStatus =  {
    PUBLISH : 'Publish',
    UNPUBLISH :'Unpublish'
}

const bookLearningStage = {
    NOTSTARTED :'Not Started',
    STARTED : 'Started',
    PARTIALLYCOMPLETED : 'Partially Completed',
    COMPLETED : 'Completed'
}

const bookSchema = Joi.object().keys({
       title : [Joi.string().required(),"Please Enter Title Of Book"], 
       isbn : [Joi.string().required().min(8).max(13),"Please Enter ISBN Of Book"], 
       pageCount : [Joi.number().required(),"Please Enter Pages Of Book"], 
       publishedDate : [Joi.date().required(),"Please Enter Published Date Of Book"], 
       thumbnailUrl : [Joi.string()], 
       shortdescription : [Joi.string().required(),"Please Enter Short Desription Of Book"],
       longdescription : [Joi.string().required(),"Please Enter Long Description Of Book"],
       status : [Joi.string().valid(bookStatus.PUBLISH,bookStatus.UNPUBLISH).required(),"Please Enter Status Of Book"], 
       authors : [Joi.string().required(),"Please Enter Author Of Book"],
       categories : [Joi.string().required(),"Please Enter Categories Of Book"],
       learningStage : [Joi.string().valid(bookLearningStage.COMPLETED,bookLearningStage.NOTSTARTED,bookLearningStage.STARTED,bookLearningStage.PARTIALLYCOMPLETED).required(),"Please Enter Learning Stage Of Book"],
       pagesCompleted : [Joi.number().required(),"Please Enter Page Completed Of Book"]
})

export default bookSchema;