const db = require('../../config/db')


module.exports = {
     all(callback){
        db.query(`SELECT t.*, COUNT(s.id) total_students
        FROM teachers t LEFT JOIN students s ON (s.teachers_id = t.id) GROUP BY t.id ORDER BY total_students DESC`, function(err, result){
            if(err) throw `${err}`
            callback(result.rows)
        })
     },
     create(values, callback){
         const query = `INSERT INTO teachers (avatar_url, name, birth_date, education_level,class_type,subjects_taught, created_at)
         VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id`;

         db.query(query,values,function(err,result){
             if(err) throw `${err}`
             callback(result.rows[0])
         })
     },
     find(id, callback){
         db.query(`SELECT * FROM teachers where id = $1`, [id], function(err,result){
             if(err) throw `${err}`
             callback(result.rows[0])
         })
     },
     edit(values, callback){
         db.query(`UPDATE teachers 
                    SET avatar_url= $1, name=$2, birth_date=$3, education_level=$4,class_type=$5,subjects_taught=$6
                    WHERE id = $7`, values, function(err,result){
                        if(err) throw `${err}`
                        callback()
                    })
     },
     paginate(params){
         const {filter, limit, offset, callback} = params

         let query = '',
             filterQuery = '',
             totalTeachersQuery = `(SELECT COUNT(*) FROM teachers) as total_teachers`
             
             if(filter){
                 filterQuery = `WHERE t.name ILIKE '%${filter}%'`
                 totalTeachersQuery = `(SELECT COUNT(*) FROM teachers t ${filterQuery} ) as total_teachers`
             }

             query = `SELECT t.*,${totalTeachersQuery} 
                        FROM teachers t
                        LEFT JOIN students s
                        ON(t.id = s.teacher_id)

                        ${filterQuery}
                        GROUP BY t.id
                        LIMIT ${limit} OFFSET ${offset}`

         db.query(query, function(err,result){
             if(err) throw `${err}`
             callback(result.rows)
         })
     }
}