const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected.');

    const users = await User.find({});
    console.log("ALL USERS:");
    users.forEach(u => console.log(` - [${u.role}] ${u.name}: ${u.email}`));

    let updatedCount = 0;
    for (const user of users) {
      if (user.email && user.email.endsWith('.con')) {
        const oldEmail = user.email;
        const newEmail = oldEmail.slice(0, -4) + '.com';
        user.email = newEmail;
        await user.save();
        console.log(`Updated user "${user.name}" (${user.role}) email from "${oldEmail}" to "${newEmail}"`);
        updatedCount++;
      }
    }

    if (updatedCount === 0) {
      console.log('No user emails with ".con" ending found.');
    } else {
      console.log(`Successfully updated ${updatedCount} user email(s).`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Error running script:', err);
    process.exit(1);
  }
};

run();
