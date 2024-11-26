import UserModel from "../models/User.js";

// Получение всех пользователей
export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();

        if (!users) {
            return res.status(404).json({
                message: 'Польщователи не найдены',
            })
        }

        res.status(200).json(users);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка"
        })
    }
};

// Получение одного пользователя по ID
export const getUserByID = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findOne({_id: id});

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            })
        }

        res.status(200).json(user);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка"
        })
    }
};