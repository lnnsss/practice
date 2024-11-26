import ProductModel from "../models/Product.js";

// Добавление товара
export const createProduct = async (req, res) => {
    const doc = new ProductModel(req.body);

    const product = await doc.save();

    res.status(200).json(product);
}

// Получение всех товаров
export const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();

        if (!products) {
            return res.status(404).json({
                message: 'Товары не найдены',
            })
        }

        res.status(200).json(products);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка"
        })
    }
};

// Получение одного товара по ID
export const getProductByID = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findOne({_id: id});

        if (!product) {
            return res.status(404).json({
                message: 'Товар не найден',
            })
        }

        res.status(200).json(product);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка"
        })
    }
};

// Изменение одного товара по ID
export const updateProductByID = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        const product = await ProductModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!product) {
            return res.status(404).json({
                message: "Пользователь не найден"
            });
        }

        res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не получилось удалить пользователя"
        })
    }
}

// Удаление одного товара по ID
export const deleteProductByID = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                message: "Товар не найден"
            });
        }

        res.status(200).json({
            message: "Товар успешно удалён",
            product
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не получилось удалить товар"
        })
    }
}