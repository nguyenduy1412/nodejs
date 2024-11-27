var User = require('../../model/users.model.js');

const userController = {
    index: async (req, res) => {
        try {
            const user = await user.find();
            res.render('admin/user/index', { user });
        } catch (err) {
            console.error(err);
            res.status(500).send("Error retrieving user");
        }
    },
    add: (req, res) => {
        res.render('admin/user/add');
    },
    create: async (req, res) => {
        try {
            // Sử dụng user.create để tạo và lưu danh mục mới vào MongoDB
            const user = await user.create({
                email: req.body.email,
                password: req.body.password, // status có thể là true hoặc false
            
            });
            // Sau khi lưu thành công, chuyển hướng người dùng đến trang danh sách danh mục
            res.redirect('/admin/user');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    },
    edit: async (req, res) => {
        const id = req.params.id;
        console.log(id);
        try {
            const user = await user.findById(id);
            if (!user) {
                return res.status(404).json({ message: "user not found" });
            }
            res.render("admin/user/update", { user });
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
            const user = await user.findByIdAndUpdate(
                req.body.id, 
                {
                    link: req.body.link,
                    status: req.body.status, // status có thể là true hoặc false
                    img: img,   
                    position:req.body.position 
                },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "user not found" });
            }
            res.redirect('/admin/user');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    },
    delete: async (req, res) => {
        const id = req.params.id; 
        try {
            const user = await user.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).json({ message: "user not found" });
            }
            res.redirect('/admin/user');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = userController;