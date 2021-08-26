
function errorHandler(err, req, res, next){
    console.log(err)
    if (typeof (err) === 'string') {
        return res.status(400).json({success: false, message: err.message})
    }

    if (err.name == 'EmailSendError' || err.name == 'NotFound'){
        return res.status(400).json({success: false, message: err.message})
    }

    if (err.name == 'RajaOngkirError') {
        return res.status(err.status).json({success: false, message: err.message})
    }

    if (err.message == undefined){
        return res.status(500).json({success: false, message: "Unknown Error"})
    } else {
        return res.status(500).json({success: false, message: JSON.stringify(err)})
    }
}

module.exports = errorHandler;