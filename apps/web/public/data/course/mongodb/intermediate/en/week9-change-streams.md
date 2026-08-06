# Change Streams & Transactions

> **Kategori:** MongoDB | **Level:** Intermediate | **Minggu 9:** Change Streams & Transactions

## Learning Objectives

- Change streams for realtime
- Multi-document ACID
- withTransaction
- Read/write concern in transactions
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

## Key Concepts

### Change Streams
Monitor data changes in realtime.

### ACID Transactions
Multi-document transactions with sessions.

### withTransaction
Wrapper for auto commit/rollback.

### Concerns
Read and write concern in transactions.

### Sessions
Client sessions for transactions.

---

## Experiments

- Resume tokens
- Transaction retry
- Bulk in transaction
- Capped collections

---

## Challenge

Order system: transaction + change stream notification.

---

## Summary

Week 9 of 10: **Change Streams & Transactions** (Intermediate).
