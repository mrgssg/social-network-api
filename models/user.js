const { Schema, model } = require('mongoose');
const { User } = require('.');
const User = model('User', userSchema);

const userSchema = new Schema(
    {
        username: {
            tpe: String,
            required: [true, 'username is required'],
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: [true, 'a valid email address is required'],
            match:[/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'please enter a valid email address'],
            unique: true
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }],
            friends: [this]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// get total friend count
userSchema.virtual('friendCount').get(function() {
    return this.firends.length;
});

module.exports = User;