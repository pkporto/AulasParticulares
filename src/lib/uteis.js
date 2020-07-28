module.exports = {
    age: function(timestamp) {
        const data = new Date(timestamp);
        const today = new Date();
        
        const age = today.getFullYear() - data.getFullYear();
        const month = today.getMonth() - data.getMonth();
        const dia = today.getDate() - data.getDate();

        if(month < 0 || month == 0 && dia <= 0){
            age -= 1;
        }

        return age
    },
    desde: function(timestamp){
        const data = new Date(timestamp);

        const mes = `0${data.getUTCMonth() +1}`.slice(-2);
        const dia = `0${data.getUTCDate()}`.slice(-2);
        const year = data.getUTCFullYear();
        const iso= `${year}-${mes}-${dia}`;
        const br=`${dia}/${mes}/${year}`
        return {
            iso,
            br
        }

    }
}