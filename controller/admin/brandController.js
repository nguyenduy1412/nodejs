var Brand = require('../../model/brand.model.js');

const brandController = {
    index: async (req, res) => {
        try {
            const brand = await Brand.find({});
            res.render('admin/brand/index', { brand });
        } catch (err) {
            console.error(err);
            res.status(500).send("Error retrieving brand");
        }
    },
    add: (req, res) => {
        res.render('admin/brand/add');
    },
    create: async (req, res) => {
        try {
            // Sử dụng brand.create để tạo và lưu danh mục mới vào MongoDB
            const brand = await Brand.create({
                name: req.body.name,
                status: req.body.status, // status có thể là true hoặc false
                img: req.file ? req.file.filename : "",       // Nếu có hình ảnh
            });
            // Sau khi lưu thành công, chuyển hướng người dùng đến trang danh sách danh mục
            res.redirect('/admin/brand');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    },
    edit: async (req, res) => {
        const id = req.params.id;
        console.log(id);
        try {
            const brand = await Brand.findById(id);
            if (!brand) {
                return res.status(404).json({ message: "brand not found" });
            }
            res.render("admin/brand/update", { brand });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    },
    update: async (req, res) => {
       
        let img = req.file ? req.file.filename : req.body.img; 
        console.log(req.body)
        console.log(img)
       
        try {
            const brand = await Brand.findByIdAndUpdate(
                req.body.id, 
                {
                    name: req.body.name,
                    status: req.body.status, 
                    img: img 
                },
                { new: true }
            );
            if (!brand) {
                return res.status(404).json({ message: "brand not found" });
            }
            res.redirect('/admin/brand');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    },
    delete: async (req, res) => {
        const id = req.params.id; 
        try {
            const brand = await Brand.findByIdAndDelete(id);
            if (!brand) {
                return res.status(404).json({ message: "brand not found" });
            }
            res.redirect('/admin/brand');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = brandController;