
function errorHandler(err, req, res, next){
    console.log(err)
    if (typeof (err) === 'string') {
        return res.status(400).json({error: err.message})
    }

    if (err.message == undefined){
        return res.status(500).json({error: "Unknown Error"})
    } else {
        return res.status(500).json({error: JSON.stringify(err)})
    }
}

module.exports = errorHandler;