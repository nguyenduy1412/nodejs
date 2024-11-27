
var Product = require('../../model/product.model');
var Brand = require('../../model/brand.model');
var Category = require('../../model/category.model');
const productController = {
    index: async (req, res) => {
        try {
            const product = await Product.find()
            .populate('category')
            .populate('brand');
            res.render('admin/product/index', { product });
        } catch (err) {
            console.error(err);
            res.status(500).send("Error retrieving product");
        }
    },
    add: async (req, res) => {
        // Lấy danh sách nhà xuất bản
        const brands = await Brand.find({});
        const categories = await Category.find({});
        // Render trang thêm sách với dữ liệu lấy được
        res.render('admin/product/add', {
            brands,
            categories,
        });
    },
    create: async (req, res) => {
        console.log(req.body)
        console.log(req.file.filename)
        var price;
        var price_enter = Number(req.body.price_enter);  // Giá trị nhập vào, cần phải là một số
        var sale = Number(req.body.sale);  // Tỷ lệ giảm giá, cần phải là một số
        var profit = Number(req.body.profit);
        // Tính toán price sau giảm giá
        price = price_enter * (1 + profit / 100)
        priceSale = price * (1 - sale / 100)

        console.log("giá: ", price)
        try {
         
            const product = await Product.create({
                name: req.body.name,
                priceEnter: price_enter,
                price: price,
                priceSale: priceSale,
                image: req.file ? req.file.filename : "", 
                profit: profit,
                publicationYear: req.body.publicationYear,
                sale: sale,
                description: req.body.description,
                brand: req.body.brandId,
                category: req.body.categoryId,
                status: req.body.status
            });
            // Sau khi lưu thành công, chuyển hướng người dùng đến trang danh sách danh mục
            res.redirect('/admin/product');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
       
    },
    edit: async (req, res) => {
        var id = req.params.id;
        console.log(id);
        const brands = await Brand.find({});
        const categories = await Category.find({});
        const product = await Product.findById(id);
        // Render trang thêm sách với dữ liệu lấy được
        res.render('admin/product/update', {
            product,
            brands,
            categories,
        });

    },
    update: (req, res) => {
        var price;
        var price_enter = Number(req.body.price_enter);  // Giá trị nhập vào, cần phải là một số
        var sale = Number(req.body.sale);  // Tỷ lệ giảm giá, cần phải là một số
        var profit = Number(req.body.profit);
        // Tính toán price sau giảm giá
        price = price_enter * (1 + profit / 100)
        priceSale = price * (1 - sale / 100)
        console.log(req.file)
        let img = req.file ? req.file.filename : req.body.image
        product.update(req, priceSale, price, img, (err, data) => {
            console.log(data)
            if (err) {
                console.log(err);
                res.status(500).json({ error: err });
            } else {
                res.redirect('/admin/product');
            }

        });
    },
    delete: async (req, res) => {
        const id = req.params.id; 
        try {
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                return res.status(404).json({ message: "product not found" });
            }
            res.redirect('/admin/product');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = productController;