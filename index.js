let horario = document.querySelector('.time')

async function getCurrentShowWithId(channelId) {
    let currentdate = new Date();

    let dateToday = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate();
    let timeStart = 'T00:00:00Z';
    let timeEnd = 'T23:59:00Z';

    fetch(
            'https://programacao.netcombo.com.br/gatekeeper/exibicao/select?q=id_revel:1_' + channelId +
            '+&callback=callbackShows&json.wrf=callbackShows&wt=json&rows=100000&sort=id_canal%20asc,dh_inicio%20asc&fl=dh_fim%20dh_inicio%20st_titulo%20titulo%20id_programa%20id_canal&fq=dh_inicio:%5B' +
            dateToday + timeStart + '%20TO%20' + dateToday + timeEnd + '%5D&callback=callbackShowsRequest%20method:GET'
        )
        .then(response => {
            return response.text();
        })
        .then(final => {
            let novaString = final.substring("callbackShows(".length, final.length - 1);
            var obj = JSON.parse(novaString);

            let programas = obj.response.docs

            programas.map(item => {
                if (item.titulo === "Big Brother Brasil 22") {
                    let horarioInicio = item.dh_inicio.split("T")[1].split('Z')[0]
                    horario.innerHTML = horarioInicio
                }
            })
        })
}

getCurrentShowWithId(435)