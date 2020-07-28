const {age,desde} = require('../../lib/uteis');


module.exports ={
    index(req,res){
    return res.render("students/index",{ students :data.students });

    },
    post(req,res){
        const keys = Object.keys(req.body);
        for(key of keys){
            if(req.body[key] == ''){
                return res.send('você precisa preencher todos os campos!');
            }
        }
    
        let {avatar_url, name, birth, graduation, type, acompanhamento} = req.body;
        return
    },
    show(req,res){
        const id = req.params.id;

        const foundStudent = data.students.find(function(foundStudent){
            return foundStudent.id == id;
        })
    
        if(!foundStudent) return res.send('Professor não encontrado!');
    
        const student = {
            ...foundStudent,
            birth: age(foundStudent.birth),
            materias: foundStudent.acompanhamento.split(','),
            created_at: new Intl.DateTimeFormat('pt-BR').format(foundStudent.created_at)
        }
    
        return res.render("students/show", {student});
    },
    edit(req,res){
        const id = req.params.id;

        const foundStudent = data.students.find(function(foundStudent){
            return foundStudent.id == id;
        })
    
        if(!foundStudent) return res.send('Professor não encontrado!');
    
        const student  = {
            ...foundStudent,
            birth: desde(foundStudent.birth),
            acompanhamento: foundStudent.acompanhamento.split(',')
    
        }
        
        return res.render('students/edit', {student})
    },
    put(req,res){
        const {id} = req.body;

        let index = 0;
    
        const foundStudent = data.students.find(function(foundStudent, foundIndex){
            if(foundStudent.id == id){
                index = foundIndex;
                return true
            }
        })
    
        if(!foundStudent) res.send('nao achou o professor');
        const student = {
            ...foundStudent,
            ...req.body
        }
        return
    },
    delete(req,res){
        const {id} = req.body;

        const filteredStudent = data.students.filter(function(student){
            return student.id != id;
        })
    
        data.students = filteredStudent;
    }
}


