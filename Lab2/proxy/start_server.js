const app = require('./routes')
const conf = require('./service')

app.listen(conf.get('port'), () => {
    console.log('Server start at localhost ' + conf.get('port'));
});