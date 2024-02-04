//Imorting
const router = require('express').Router();
const Expencses = require('../models/expenses');

//Post/ home/add-expence
router.post('/add-expence', async (req, res) => {
    try {
        const { userId, date, paidTo, paidFor, description, amount } = req.body;

        const user = await Expencses.findOne({ userId: userId })

        if (user == null) {

            const currentBalance = 0;
            const expence = new Expencses({
                userId,
                currentBalance
            });
            const balance = 0;
            expence.data.push({
                date,
                paidTo,
                paidFor,
                amount,
                description,
                balance
            })
            await expence.save();

        } else {
            const balance = user.currentBalance - amount
            user.data.push({
                date,
                paidTo,
                paidFor,
                amount,
                description,
                balance
            })
        }

        await Expencses.findOneAndUpdate({ userId: userId }, {
            $set: {
                'currentBalance': user.currentBalance - amount
            }
        })

        user.save();


        res.status(201).json({ message: "Successfully added..." })
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

//GET/ home/user-expenses
router.get('/user-expenses/:Id', async (req, res) => {
    const id = req.params.Id
    const data = await Expencses.findOne({ userId: id })
    res.send(data);
})

//POST/ home/add-balance
router.post('/add-balance', async (req, res) => {
    try {
        const { userId, amount, currentBalance } = req.body;
        const user = await Expencses.findOne({ userId: userId })

        if (user) {
            await Expencses.findOneAndUpdate({ userId: userId }, {
                $set: {
                    "currentBalance": parseInt(amount) + parseInt(currentBalance)
                }
            })
        } else {
            const currentBalance = amount;
            const user = new Expencses({
                userId,
                currentBalance
            })

            await user.save();

        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})

//DELETE/ home/delete
router.delete('/delete', async (req, res) => {
    try {
        const { userId, rowId } = req.body
        const user = await Expencses.findOne({ userId: userId })

        const itemIndex = user.data.findIndex(({ id }) => id === rowId);
        if (itemIndex >= 0) {
            user.data.splice(itemIndex, 1);
        }
        user.save();
        res.send('deleted')
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})

//PUT/ home/edit
router.put('/edit', async (req, res) => {
    try {
        const { userId, rowId, date, paidTo, paidFor, amount, description } = req.body
        
        Expencses.findOne({ userId: userId }).then(doc => {
            const data = doc.data.id(rowId);
            data.date= date
            data.paidTo= paidTo
            data.paidFor= paidFor
            data.amount= amount
            data.description= description
            doc.save(); 
           
        }).catch(err => {
            console.log('Error:', err);
        });
        res.send('edited')
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})

//GET/ home/expences
router.get('/expenses', async (req, res) => {
    try {
        res.status(200).send(await Expencses.find());
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
})

module.exports = router;