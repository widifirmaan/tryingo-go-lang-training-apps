# Change Streams & Transactions

> **Kategori:** MongoDB | **Level:** Menengah | **Minggu 9:** Change Streams & Transactions

## Tujuan Pembelajaran

- Change streams untuk realtime
- Multi-document ACID
- withTransaction
- Read/write concern di transaksi
- Session management

---

## Program: Realtime & ACID

```javascript
async function main() {
    const client = new MongoClient('mongodb://localhost:27017/?replicaSet=rs0');
    await client.connect();
    const db = client.db('toko_db');
    const produk = db.collection('produk');
    const pesanan = db.collection('pesanan');

    // Change Streams: realtime monitoring
    const changeStream = produk.watch([
        { $match: { operationType: { $in: ['insert', 'update'] } } }
    ]);

    changeStream.on('change', (change) => {
        console.log('Operation:', change.operationType);
        console.log('Document:', change.fullDocument);
        console.log('Updated fields:', change.updateDescription?.updatedFields);
    });

    // Multi-document ACID transaction
    const session = client.startSession();
    try {
        await session.withTransaction(async () => {
            // Buat pesanan
            await pesanan.insertOne({
                pelanggan_id: ObjectId('...'),
                items: [{ produk_id: ObjectId('...'), qty: 1, harga: 12500000 }],
                total: 12500000,
                status: 'pending'
            }, { session });

            // Update stok
            await produk.updateOne(
                { _id: ObjectId('...') },
                { $inc: { stok: -1 } },
                { session }
            );

            // Update status
            await pesanan.updateOne(
                { pelanggan_id: ObjectId('...') },
                { $set: { status: 'completed' } },
                { session }
            );
        }, {
            readConcern: { level: 'snapshot' },
            writeConcern: { w: 'majority' },
            readPreference: 'primary'
        });
        console.log('Transaction committed');
    } catch (err) {
        console.error('Transaction aborted:', err);
    } finally {
        await session.endSession();
    }

    await client.close();
}
main().catch(console.error);
```

---

## Konsep Kunci

### Change Streams
Monitor perubahan data secara realtime.

### ACID Transactions
Multi-document transactions dengan session.

### withTransaction
Wrapper untuk commit/rollback otomatis.

### Concerns
Read concern dan write concern di transaksi.

### Session
Client session untuk transaksi.

---

## Eksperimen

- Resume token
- Transaction retry
- Bulk in transaction
- Capped collection

---

## Tantangan

Sistem order: transaction + change stream notification.

---

## Ringkasan

Minggu 9 dari 10: **Change Streams & Transactions** (Menengah).
