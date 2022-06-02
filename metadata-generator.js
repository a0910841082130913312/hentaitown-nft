const fs = require('fs');
const imageDir = fs.readdirSync("./img_final");
imageDir.forEach(img => {
  const metadata = {
    name: `Ahegao #${(parseInt(img.split(".")[0])+1).toString()}`,
    description: "A unique NFT in the Hentaitown ahegao series.",
    image: `ipfs://QmZCwCnvt8ezLAcYrHJDBHYX1yt8JAGoFaXbVnQLT4w7og/${img.split(".")[0]}.jpg`,
    attributes: []
  };
  fs.writeFileSync(`./metadata/${img.split(".")[0]}`, JSON.stringify(metadata));
});