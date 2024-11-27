var Category = require('../../model/category.model.js');

const categoryController = {
    index: async (req, res) => {
        try {
            const categories = await Category.find({});
            res.render('admin/category/index', { categories });
        } catch (err) {
            console.error(err);
            res.status(500).send("Error retrieving categories");
        }
    },
    add: (req, res) => {
        res.render('admin/category/add');
    },
    create: async (req, res) => {
        try {
            // Sử dụng Category.create để tạo và lưu danh mục mới vào MongoDB
            const category = await Category.create({
                name: req.body.name,
                status: req.body.status, // status có thể là true hoặc false
                img: req.file ? req.file.filename : "",       // Nếu có hình ảnh
            });
            // Sau khi lưu thành công, chuyển hướng người dùng đến trang danh sách danh mục
            res.redirect('/admin/category');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    },
    edit: async (req, res) => {
        const id = req.params.id;
        console.log(id);
        try {
            const category = await Category.findById(id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.render("admin/category/update", { category });
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
            const category = await Category.findByIdAndUpdate(
                req.body.id, 
                {
                    name: req.body.name,
                    status: req.body.status, 
                    img: img 
                },
                { new: true }
            );
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.redirect('/admin/category');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    },
    delete: async (req, res) => {
        const id = req.params.id; 
        try {
            const category = await Category.findByIdAndDelete(id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.redirect('/admin/category');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = categoryController;