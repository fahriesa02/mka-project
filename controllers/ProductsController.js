import Product from "../models/Products.js";

class productController {
    async getProducts(req, res) {
        try {
            const product = await Product.findAll();
            return res.status(200).json({
                status: true,
                product
            })
        } catch(error) {
            res.status(400).json({
                status: false,
                message: error.message
            });
        }
    }

    async inputProduct(req, res) {
        try {
            if(!req.body.productName) throw {
                code: 400,
                message: 'NAMA_PRODUK_HARUS_TERISI'
            }
            if(!req.body.pieceOfProduct) throw {
                code: 400,
                message: 'JUMLAH_PIECES_HARUS_TERISI'
            }
            if(!req.body.imageProduct) throw {
                code: 400,
                message: 'GAMBAR_PRODUK_HARUS_ADA'
            }
            if(req.body.expiredDate) throw {
                code: 400,
                message: 'ISI_TANGGAL_EXPIRE'
            }
            if(!req.body.expiredStatus) throw {
                code: 400,
                message: 'ISI_STATUS_EXPIRE'
            }
            if(!req.body.idProduct) throw {
                code: 400,
                message: 'ID_PRODUK_HARUS_TERISI'
            }
            if(!req.body.stockProduct) throw {
                code: 400,
                message: 'STOK_PRODUK_HARUS_TERISI'
            }


            const product = await Product.create({
                productName: req.body.productName,
                pieceOfProduct: req.body.pieceOfProduct,
                imageProduct: req.body.imageProduct,
                expiredDate: req.body.expiredDate,
                expiredStatus: req.body.expiredStatus,
                idProduct: req.body.idProduct,
                stockProduct: req.body.stockProduct
            });

            return res.status(200).json({
                status: true,
                product
            });
        } catch(error) {
            return res.status(error.code || 500).json({
                status: false,
                message: error.message
            });
        }
    }

    async deleteProduct(req, res) {
        try {
            await Product.destroy({
                where: {
                    idProduct: req.body.idProduct
                }
            });

            return res.status(200).json({
                status: true,
                message: 'PRODUCT_DIHAPUS'
            });
        } catch(error) {
            return res.status(error.code).json({
                status: false,
                message: error.message
            })
        }
    }
}

export default new productController();