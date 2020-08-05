const { age, desde } = require('../../lib/uteis');
const Student = require('../models/students');
const { renderString } = require('nunjucks');

module.exports = {
    index(req, res) {
        Student.all(function (students) {
            if (!students) return res.send("Erro");

            return res.render('students/index', { students })
        })

    },
    create(req, res) {
        return res.render('students/create')
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

        Student.create(values, function(student){
            if(!student) return res.send('Erro ao cadastrar')

            return res.redirect(`/students/${student.id}`)
        })

    },
    show(req, res) {
        Student.find(req.params.id,function(student){
            if(!student) return res.send('Erro na busca');
            student.birth_date = age(student.birth_date); 
            console.log(student)
            return res.render('students/show',{student})
        })
    },
    edit(req, res) {
        Student.find(req.params.id,function(student){
            if(!student) return res.send('Erro na busca');
            student.birth_date = desde(student.birth_date).iso; 
            console.log(student.birth_date)
            student.subjects_taught = student.subjects_taught.split(',');

            return res.render('students/edit',{student})
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

        Student.edit(values, function(){

            return res.redirect(`/students/${req.body.id}`)
        })

    },
    delete(req, res) {
    }
}


