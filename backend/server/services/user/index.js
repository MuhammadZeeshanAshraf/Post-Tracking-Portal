import { SALTROUND, SCHEMA, TABLE_DETAILS } from '../../constants';
import bcrypt from 'bcrypt';
import moment from 'moment';
const nodemailer = require('nodemailer');
const htmlToText = require('nodemailer-html-to-text').htmlToText;

const transporter = nodemailer.createTransport({
    host: 'mail.exam360.in',
    port: 26,
    auth: {
        user: 'logistic@exam360.in',
        pass: 'ep-T(y19eiof'
    },
    tls: {
        rejectUnauthorized: false
    }
});
transporter.use('compile', htmlToText());

export const registerService = async (body, models, errorList, filePath) => {
    try {
        const message = '';

        let otp = Math.random();
        otp = otp * 1000000;
        otp = parseInt(otp);

        const content = `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Exam360 Logistic</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for filling up all the detail for registration of Exam360 Logistic. Use the following OTP to complete your Sign Up procedures. Do not share this OTP with any one.</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />Exam360 Logistic</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Exam360 Logistic Inc</p>
      <p>Jharkhand, West Bengal</p>
      <p>Helpline: +91-7370005777 / 6777</p>
    </div>
  </div>
</div>`;

        const emailContent = {
            from: '"Exam360" <logistic@exam360.in>',
            to: `${body.email}`,
            subject: 'Exam360 Logistic Account',
            html: `${content}`
        };
        await transporter.sendMail(emailContent);

        const user = getDatabaseUserObject(body, otp, errorList, filePath);
        const id = await models.generalDatabaseFunction.insertSingleRowWithReturn(SCHEMA, TABLE_DETAILS.users.name, user, 'id');

        return {
            userId: id[0]
        };
    } catch (error) {
        errorList.push(error.message);
        return {
            error: error.message
        };
    }
};

const getDatabaseUserObject = (body, otp, errorList, filePath) => {
    try {
        const user = Object.assign({}, TABLE_DETAILS.users.ddl);

        for (const [key, value] of Object.entries(body)) {
            if (Object.prototype.hasOwnProperty.call(user, key)) {
                user[key] = value;
            }
            if (key === 'password') {
                const hash = bcrypt.hashSync(value, SALTROUND);
                user.password = hash;
            }
        }

        user.profile_image = filePath;
        user.otp = otp;
        return user;
    } catch (error) {
        errorList.push(error.message);
    }
};

export const postLoginService = async (request, body, models, errorList) => {
    try {
        let message = '';
        const users = await models.generalDatabaseFunction.getDatabySingleWhereColumn(SCHEMA, TABLE_DETAILS.users.name, 'email', body.email);
        if (Array.isArray(users)) {
            if (users.length > 0) {
                if (users[0].role_id === null) {
                    message = `User having email: ${body.email} must have role to be login.`;
                    errorList.push(message);
                    return {
                        error: message
                    };
                } else {
                    const roleDetails =
                        await models.generalDatabaseFunction.getDatabySingleWhereColumn(
                            SCHEMA,
                            TABLE_DETAILS.roles.name,
                            'id',
                            users[0].role_id
                        );
                    const check = bcrypt.compareSync(body.password, users[0].password);
                    if (check) {
                        const userlog = Object.assign({}, TABLE_DETAILS.userLogging.ddl);
                        userlog.user_id = users[0].id;
                        userlog.name = users[0].name;
                        userlog.ip_address = body.ip_address;
                        userlog.meta_data = JSON.stringify(users[0]);
                        userlog.login_at = moment(new Date()).format('YYYY-MM-DD hh:mm:ss A');
                        const id = await models.generalDatabaseFunction.insertSingleRowWithReturn(SCHEMA, TABLE_DETAILS.userLogging.name, userlog, 'id');
                        users[0].roleDetails = roleDetails[0];
                        request.session.user = {
                            user: users[0],
                            loggingId: id[0]
                        };
                        return {
                            user: users[0],
                            loggingId: id[0]
                        };
                    } else {
                        message = 'Wrong username/ password comination!';
                        errorList.push(message);
                        return {
                            error: message
                        };
                    }
                }
            } else {
                message = `User having email: ${body.email} does not exist.`;
                errorList.push(message);
                return {
                    error: message
                };
            }
        } else {
            message = `User having email: ${body.email} does not exist.`;
            errorList.push(message);
            return {
                error: message
            };
        }
    } catch (error) {
        errorList.push(error.message);
        return {
            error: error.message
        };
    }
};
