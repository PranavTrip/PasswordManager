const crypto = require("crypto");
const algorithm = "aes-256-ctr";
const secretKey = "pppppppppppppppppppppppppppppppp";

const encrypt = (password) => {
  const iv = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);

  const encryptedPassword = Buffer.concat([
    cipher.update(password),
    cipher.final(),
  ]);

  return {
    iv: iv.toString("hex"),
    encryptedPassword: encryptedPassword.toString("hex"),
  };
};

const decrypt = (encryption) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    Buffer.from(encryption.iv, "hex")
  );

  const decryptedPassword = Buffer.concat([
    decipher.update(Buffer.from(encryption.encryptedPassword, "hex")),
    decipher.final(),
    ]);

    return decryptedPassword.toString();
};

module.exports = { encrypt, decrypt };
