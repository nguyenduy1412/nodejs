var Banner = require('../../model/banner.model.js');

const bannerController = {
    index: async (req, res) => {
        try {
            const banner = await Banner.find({}).sort({ position: 1 });
            res.render('admin/banner/index', { banner });
        } catch (err) {
            console.error(err);
            res.status(500).send("Error retrieving banner");
        }
    },
    add: (req, res) => {
        res.render('admin/banner/add');
    },
    create: async (req, res) => {
        try {
            // Sử dụng banner.create để tạo và lưu danh mục mới vào MongoDB
            const banner = await Banner.create({
                link: req.body.link,
                status: req.body.status, // status có thể là true hoặc false
                img: req.file ? req.file.filename : "",    
                position:req.body.position    // Nếu có hình ảnh
            });
            // Sau khi lưu thành công, chuyển hướng người dùng đến trang danh sách danh mục
            res.redirect('/admin/banner');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    },
    edit: async (req, res) => {
        const id = req.params.id;
        console.log(id);
        try {
            const banner = await Banner.findById(id);
            if (!banner) {
                return res.status(404).json({ message: "banner not found" });
            }
            res.render("admin/banner/update", { banner });
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
            const banner = await Banner.findByIdAndUpdate(
                req.body.id, 
                {
                    link: req.body.link,
                    status: req.body.status, // status có thể là true hoặc false
                    img: img,   
                    position:req.body.position 
                },
                { new: true }
            );
            if (!banner) {
                return res.status(404).json({ message: "banner not found" });
            }
            res.redirect('/admin/banner');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    },
    delete: async (req, res) => {
        const id = req.params.id; 
        try {
            const banner = await Banner.findByIdAndDelete(id);
            if (!banner) {
                return res.status(404).json({ message: "banner not found" });
            }
            res.redirect('/admin/banner');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = bannerController;