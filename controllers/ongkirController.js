'use strict'
const axios = require('axios')
const url = process.env.RAJA_ONGKIR_URL
class OngkirController{
    static async getProvince(req, res, next) {
        try {
            let id = (req.query.id)?'/?id='+req.query.id:''
            let headers = {key: process.env.RAJA_ONGKIR_API}

            axios({
                method: 'get',
                url: url + '/province' + id,
                data: req.body,
                headers: headers
              })
            .then(({data, status}) => {
                res.status(status).json(data.rajaongkir.results)
            }).catch(({response}) => {
                throw ({
                    name: "RajaOngkirError",
                    status: response.data.rajaongkir.status.code,
                    message: response.data.rajaongkir.status.description
                })
            })
        } catch (error) {
            next(error)
        }
    }

    static async getCity (req, res, next) {
        try {
            let id = (req.query.id)?'id='+req.query.id:''
            let idProvince = (req.query.province)?'province'+req.query.province:''
            let query = ""

            if (id != '' && idProvince != ''){
                query = '?' + id + '&' + idProvince
            } else if (id != '' && idProvince =='') {
                query = '?' + id
            } else if (id == '' && idProvince != '') {
                query = '?' + idProvince
            }


            let headers = {key: process.env.RAJA_ONGKIR_API}

            axios({
                method: 'get',
                url: url + '/city' + query,
                data: req.body,
                headers: headers
              })
            .then(({data, status}) => {
                res.status(status).json(data.rajaongkir.results)
            }).catch(({response}) => {
                throw ({
                    name: "RajaOngkirError",
                    status: response.data.rajaongkir.status.code,
                    message: response.data.rajaongkir.status.description
                })
            })
        } catch (error) {
            next(error)
        }
    }

    static async countCost(req, res, next) {
        try {
            let headers = {key: process.env.RAJA_ONGKIR_API}

            axios({
                method: 'get',
                url: url + '/cost',
                data: req.body,
                headers: headers
              })
            .then(({data, status}) => {
                res.status(status).json(data.rajaongkir)
            }).catch(({response}) => {
                throw ({
                    name: "RajaOngkirError",
                    status: response.data.rajaongkir.status.code,
                    message: response.data.rajaongkir.status.description
                })
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = OngkirController