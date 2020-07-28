const { age, desde } = require('../../lib/uteis');
const Teacher = require('../models/teachers');
const { renderString } = require('nunjucks');

module.exports = {
    index(req, res) {
        Teacher.all(function (teachers) {
            if (!teachers) return res.send("Erro");

            return res.render('teachers/index', { teachers })
        })

    },
    create(req, res) {
        return res.render('teachers/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == '') return res.send('Você precisa preencher todos os campos')
        }

        const values = [
            req.body.avatar_url,
            req.body.name,
            desde(req.body.birth_date).iso,
            req.body.education_level,
            req.body.class_type,
            req.body.subjects_taught,
            created_at = desde(Date.now()).iso
        ]

        Teacher.create(values, function(teacher){
            if(!teacher) return res.send('Erro ao cadastrar')

            return res.redirect(`/teachers/${teacher.id}`)
        })

    },
    show(req, res) {
        Teacher.find(req.params.id,function(teacher){
            if(!teacher) return res.send('Erro na busca');
            console.log(teacher.birth_date)
            teacher.birth_date = age(teacher.birth_date); 
            teacher.created_at = desde(teacher.created_at).br;
            teacher.subjects_taught = teacher.subjects_taught.split(',') ;
            return res.render('teachers/show',{teacher})
        })
    },
    edit(req, res) {
        Teacher.find(req.params.id,function(teacher){
            if(!teacher) return res.send('Erro na busca');
            teacher.birth_date = desde(teacher.birth_date).iso; 
            console.log(teacher.birth_date)
            teacher.subjects_taught = teacher.subjects_taught.split(',');

            return res.render('teachers/edit',{teacher})
        })
    },
    put(req, res) {

        const keys = Object.keys(req.body)

        for(key in keys){
            if(req.body[key]=='') return res.send('Nao foi editado')
        }

        const values = [
            req.body.avatar_url,
            req.body.name,
            desde(req.body.birth_date).iso,
            req.body.education_level,
            req.body.class_type,
            req.body.subjects_taught,
            req.body.id
        ]

        Teacher.edit(values, function(){

            return res.redirect(`/teachers/${req.body.id}`)
        })

    },
    delete(req, res) {
    }
}


