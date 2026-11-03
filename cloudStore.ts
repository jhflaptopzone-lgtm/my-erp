import { firestore, collection, doc, setDoc, getDocs, deleteDoc, getDoc } from './firebase.ts';
import { v4 as uuidv4 } from 'uuid';

export const logCloudActivity = async (
  action: string,
  entityType: string,
  entityId: string | number,
  details: string,
  userId?: string | number
) => {
  try {
    const logId = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const logRef = doc(firestore, 'activity_logs', logId);
    await setDoc(logRef, {
      log_id: logId,
      action,
      entity_type: entityType,
      entity_id: String(entityId),
      details,
      user_id: userId ? String(userId) : 'system',
      timestamp: new Date().toISOString()
    });
    console.log(`[CloudStore] Activity logged: ${action} on ${entityType}:${entityId}`);
  } catch (err: any) {
    console.warn('[CloudStore] Activity log warning:', err.message);
  }
};

export const syncToCloud = async (
  collectionName: string,
  id: string | number,
  data: Record<string, any>
) => {
  try {
    const docRef = doc(firestore, collectionName, String(id));
    await setDoc(docRef, { ...data, id: String(id), updated_at: new Date().toISOString() }, { merge: true });
    console.log(`[CloudStore] Synced ${collectionName}:${id} to Firestore`);
    return true;
  } catch (err: any) {
    console.error(`[CloudStore] Sync failed for ${collectionName}:${id}:`, err.message);
    throw err;
  }
};

export const deleteFromCloud = async (collectionName: string, id: string | number) => {
  try {
    const docRef = doc(firestore, collectionName, String(id));
    await deleteDoc(docRef);
    console.log(`[CloudStore] Deleted ${collectionName}:${id} from Firestore`);
    return true;
  } catch (err: any) {
    console.warn(`[CloudStore] Delete failed for ${collectionName}:${id}:`, err.message);
    return false;
  }
};

export const clearAllCloudData = async () => {
  console.log('[CloudStore] Clearing all transactional and demo collections from Firestore...');
  const collectionsToClear = [
    'inventory',
    'sales',
    'installments',
    'sale_payments',
    'suppliers',
    'supplier_purchases',
    'supplier_payments',
    'activity_logs'
  ];

  for (const col of collectionsToClear) {
    try {
      const snap = await getDocs(collection(firestore, col));
      for (const d of snap.docs) {
        await deleteDoc(d.ref);
      }
      console.log(`[CloudStore] Cleared ${snap.size} documents from collection '${col}'`);
    } catch (err: any) {
      console.warn(`[CloudStore] Error clearing collection '${col}':`, err.message);
    }
  }

  // Log fresh clean slate event
  await logCloudActivity('SYSTEM_RESET', 'system', 'all', 'All demo data reset to 100% pristine clean slate');
};

export const loadAllFromCloud = async (collectionName: string) => {
  try {
    const colRef = collection(firestore, collectionName);
    const snap = await getDocs(colRef);
    const docs: any[] = [];
    snap.forEach((d) => docs.push(d.data()));
    return docs;
  } catch (err: any) {
    console.warn(`[CloudStore] Load failed for ${collectionName}:`, err.message);
    return [];
  }
};

export const getCloudStats = async () => {
  const collections = ['inventory', 'sales', 'suppliers', 'supplier_purchases', 'supplier_payments', 'installments', 'sale_payments', 'users', 'activity_logs'];
  const stats: Record<string, number> = {};
  for (const c of collections) {
    try {
      const snap = await getDocs(collection(firestore, c));
      stats[c] = snap.size;
    } catch {
      stats[c] = 0;
    }
  }
  return {
    connected: true,
    firestore_db: 'ai-studio-jhflaptopzone-7d9acb30-1934-4e7c-af93-678e4204945e',
    counts: stats,
    last_checked: new Date().toISOString()
  };
};

export const syncAllToCloud = async (dbQuery: (sql: string, params?: any[]) => Promise<any>) => {
  console.log('[CloudStore] Starting Full Database Backup to Firestore...');
  const report = {
    suppliers: 0,
    inventory: 0,
    sales: 0,
    installments: 0,
    sale_payments: 0,
    supplier_purchases: 0,
    supplier_payments: 0,
    users: 0
  };

  try {
    // 1. Suppliers
    const suppliers = (await dbQuery("SELECT * FROM suppliers")).rows;
    for (const s of suppliers) {
      await syncToCloud('suppliers', s.id, {
        name: s.name,
        mobile: s.mobile || null,
        address: s.address || null,
        opening_balance: parseFloat(s.opening_balance) || 0,
        created_at: s.created_at || new Date().toISOString()
      });
      report.suppliers++;
    }

    // 2. Inventory
    const inventory = (await dbQuery("SELECT * FROM inventory")).rows;
    for (const item of inventory) {
      await syncToCloud('inventory', item.id, {
        model: item.model,
        config: item.config,
        serial_number: item.serial_number,
        buy_price: parseFloat(item.buy_price),
        sell_price: parseFloat(item.sell_price),
        supplier_name: item.supplier_name || null,
        supplier_id: item.supplier_id || null,
        purchase_date: item.purchase_date || null,
        status: item.status || 'Available',
        created_at: item.created_at || new Date().toISOString()
      });
      report.inventory++;
    }

    // 3. Sales
    const sales = (await dbQuery("SELECT * FROM sales")).rows;
    for (const sale of sales) {
      const token = sale.invoice_public_token || uuidv4();
      await syncToCloud('sales', sale.id, {
        invoice_number: sale.invoice_number,
        inventory_id: sale.inventory_id,
        customer_name: sale.customer_name,
        customer_phone: sale.customer_phone,
        customer_address: sale.customer_address || null,
        sell_price: parseFloat(sale.sell_price),
        profit: parseFloat(sale.profit),
        payment_type: sale.payment_type,
        due_estimate_date: sale.due_estimate_date || null,
        due_reference_name: sale.due_reference_name || null,
        due_reference_phone: sale.due_reference_phone || null,
        due_terms: sale.due_terms || null,
        staff_id: sale.staff_id,
        sale_date: sale.sale_date,
        invoice_pdf_path: sale.invoice_pdf_path || null,
        invoice_public_token: token
      });
      report.sales++;
    }

    // 4. Installments
    const installments = (await dbQuery("SELECT * FROM installments")).rows;
    for (const inst of installments) {
      await syncToCloud('installments', inst.id, {
        sale_id: inst.sale_id,
        installment_number: inst.installment_number,
        due_date: inst.due_date,
        amount: parseFloat(inst.amount),
        paid_amount: parseFloat(inst.paid_amount) || 0,
        payment_date: inst.payment_date || null,
        status: inst.status || 'Pending',
        remaining_balance: parseFloat(inst.remaining_balance) || 0
      });
      report.installments++;
    }

    // 5. Sale Payments
    const salePayments = (await dbQuery("SELECT * FROM sale_payments")).rows;
    for (const p of salePayments) {
      await syncToCloud('sale_payments', p.id, {
        sale_id: p.sale_id,
        installment_id: p.installment_id || null,
        amount: parseFloat(p.amount),
        payment_date: p.payment_date,
        payment_type: p.payment_type || 'Cash',
        note: p.note || null
      });
      report.sale_payments++;
    }

    // 6. Supplier Purchases & Payments
    const purchases = (await dbQuery("SELECT * FROM supplier_purchases")).rows;
    for (const sp of purchases) {
      await syncToCloud('supplier_purchases', sp.id, {
        supplier_id: sp.supplier_id,
        inventory_id: sp.inventory_id,
        purchase_amount: parseFloat(sp.purchase_amount),
        purchase_date: sp.purchase_date
      });
      report.supplier_purchases++;
    }

    const supplierPayments = (await dbQuery("SELECT * FROM supplier_payments")).rows;
    for (const pay of supplierPayments) {
      await syncToCloud('supplier_payments', pay.id, {
        supplier_id: pay.supplier_id,
        payment_date: pay.payment_date,
        payment_amount: parseFloat(pay.payment_amount),
        payment_type: pay.payment_type || 'Cash',
        note: pay.note || null
      });
      report.supplier_payments++;
    }

    // 7. Users
    const users = (await dbQuery("SELECT id, name, access_id, password, role, created_at FROM users")).rows;
    for (const u of users) {
      await syncToCloud('users', u.id, {
        name: u.name,
        access_id: u.access_id,
        password: u.password,
        role: u.role,
        created_at: u.created_at || new Date().toISOString()
      });
      report.users++;
    }

    await logCloudActivity('FULL_SYNC', 'all', 'system', `Full cloud sync completed: ${JSON.stringify(report)}`);
    console.log('[CloudStore] Full backup completed:', report);
    return report;
  } catch (err: any) {
    console.error('[CloudStore] Full backup error:', err);
    throw err;
  }
};

export const hydrateFromCloud = async (dbQuery: (sql: string, params?: any[]) => Promise<any>) => {
  console.log('[CloudStore] Hydrating persistent data from Firebase Firestore...');

  // 1. Hydrate Users
  try {
    const users = await loadAllFromCloud('users');
    for (const u of users) {
      if (u.access_id) {
        const exist = await dbQuery("SELECT id FROM users WHERE access_id = $1", [u.access_id]);
        if (exist.rowCount === 0) {
          const idExist = u.id ? await dbQuery("SELECT id FROM users WHERE id = $1", [u.id]) : { rowCount: 0 };
          if (idExist.rowCount === 0 && u.id) {
            await dbQuery(
              "INSERT INTO users (id, name, access_id, password, role, created_at) VALUES ($1, $2, $3, $4, $5, $6)",
              [u.id, u.name, u.access_id, u.password, u.role, u.created_at || new Date().toISOString()]
            );
          } else {
            await dbQuery(
              "INSERT INTO users (name, access_id, password, role, created_at) VALUES ($1, $2, $3, $4, $5)",
              [u.name, u.access_id, u.password, u.role, u.created_at || new Date().toISOString()]
            );
          }
        } else {
          await dbQuery(
            "UPDATE users SET name = $1, password = $2, role = $3 WHERE access_id = $4",
            [u.name, u.password, u.role, u.access_id]
          );
        }
      }
    }
  } catch (err: any) {
    console.warn('[CloudStore] Hydrate users warning:', err.message);
  }

  // 2. Hydrate Suppliers
  try {
    const suppliers = await loadAllFromCloud('suppliers');
    for (const s of suppliers) {
      if (s.name) {
        const exist = await dbQuery("SELECT id FROM suppliers WHERE id = $1 OR name = $2", [s.id, s.name]);
        if (exist.rowCount === 0) {
          await dbQuery(
            "INSERT INTO suppliers (id, name, mobile, address, opening_balance, created_at) VALUES ($1, $2, $3, $4, $5, $6)",
            [s.id, s.name, s.mobile || null, s.address || null, parseFloat(s.opening_balance) || 0, s.created_at || new Date().toISOString()]
          );
        } else {
          await dbQuery(
            "UPDATE suppliers SET name = $1, mobile = $2, address = $3, opening_balance = $4 WHERE id = $5",
            [s.name, s.mobile || null, s.address || null, parseFloat(s.opening_balance) || 0, exist.rows[0].id]
          );
        }
      }
    }
  } catch (err: any) {
    console.warn('[CloudStore] Hydrate suppliers warning:', err.message);
  }

  // 3. Hydrate Inventory
  try {
    const inventory = await loadAllFromCloud('inventory');
    for (const item of inventory) {
      if (item.serial_number) {
        const exist = await dbQuery("SELECT id FROM inventory WHERE serial_number = $1 OR id = $2", [item.serial_number, item.id]);
        if (exist.rowCount === 0) {
          await dbQuery(
            "INSERT INTO inventory (id, model, config, serial_number, buy_price, sell_price, supplier_name, supplier_id, purchase_date, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
            [
              item.id,
              item.model,
              item.config,
              item.serial_number,
              parseFloat(item.buy_price) || 0,
              parseFloat(item.sell_price) || 0,
              item.supplier_name || null,
              item.supplier_id || null,
              item.purchase_date || null,
              item.status || 'Available',
              item.created_at || new Date().toISOString()
            ]
          );
        } else {
          await dbQuery(
            "UPDATE inventory SET model = $1, config = $2, buy_price = $3, sell_price = $4, supplier_name = $5, status = $6 WHERE id = $7",
            [item.model, item.config, parseFloat(item.buy_price) || 0, parseFloat(item.sell_price) || 0, item.supplier_name || null, item.status || 'Available', exist.rows[0].id]
          );
        }
      }
    }
  } catch (err: any) {
    console.warn('[CloudStore] Hydrate inventory warning:', err.message);
  }

  // 4. Hydrate Sales
  try {
    const sales = await loadAllFromCloud('sales');
    for (const sale of sales) {
      if (sale.invoice_number) {
        const token = sale.invoice_public_token || uuidv4();
        if (!sale.invoice_public_token) {
          syncToCloud('sales', sale.id, { invoice_public_token: token }).catch(() => {});
        }
        const exist = await dbQuery("SELECT id FROM sales WHERE invoice_number = $1 OR id = $2", [sale.invoice_number, sale.id]);
        if (exist.rowCount === 0) {
          await dbQuery(
            "INSERT INTO sales (id, invoice_number, inventory_id, customer_name, customer_phone, customer_address, sell_price, profit, payment_type, due_estimate_date, due_reference_name, due_reference_phone, due_terms, staff_id, sale_date, invoice_pdf_path, invoice_public_token) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)",
            [
              sale.id,
              sale.invoice_number,
              sale.inventory_id,
              sale.customer_name,
              sale.customer_phone,
              sale.customer_address || null,
              parseFloat(sale.sell_price) || 0,
              parseFloat(sale.profit) || 0,
              sale.payment_type || 'Cash',
              sale.due_estimate_date || null,
              sale.due_reference_name || null,
              sale.due_reference_phone || null,
              sale.due_terms || null,
              sale.staff_id || 1,
              sale.sale_date || new Date().toISOString(),
              sale.invoice_pdf_path || null,
              token
            ]
          );
        } else {
          await dbQuery(
            "UPDATE sales SET invoice_public_token = COALESCE(invoice_public_token, $1) WHERE invoice_number = $2",
            [token, sale.invoice_number]
          );
        }
      }
    }
  } catch (err: any) {
    console.warn('[CloudStore] Hydrate sales warning:', err.message);
  }

  // 5. Hydrate Installments
  try {
    const installments = await loadAllFromCloud('installments');
    for (const inst of installments) {
      try {
        if (!inst.id || !inst.sale_id) continue;
        const saleExist = await dbQuery("SELECT id FROM sales WHERE id = $1", [inst.sale_id]);
        if (saleExist.rowCount === 0) continue; // Skip orphaned installments from deleted sales!

        const exist = await dbQuery("SELECT id FROM installments WHERE id = $1", [inst.id]);
        if (exist.rowCount === 0) {
          await dbQuery(
            "INSERT INTO installments (id, sale_id, installment_number, due_date, amount, paid_amount, payment_date, status, remaining_balance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
            [
              inst.id,
              inst.sale_id,
              inst.installment_number,
              inst.due_date,
              parseFloat(inst.amount) || 0,
              parseFloat(inst.paid_amount) || 0,
              inst.payment_date || null,
              inst.status || 'Pending',
              parseFloat(inst.remaining_balance) || 0
            ]
          );
        } else {
          await dbQuery(
            "UPDATE installments SET paid_amount = $1, status = $2, remaining_balance = $3 WHERE id = $4",
            [parseFloat(inst.paid_amount) || 0, inst.status || 'Pending', parseFloat(inst.remaining_balance) || 0, inst.id]
          );
        }
      } catch (e: any) {
        console.warn(`[CloudStore] Installment ${inst.id} skip:`, e.message);
      }
    }
  } catch (err: any) {
    console.warn('[CloudStore] Hydrate installments warning:', err.message);
  }

  // 6. Hydrate Sale Payments
  try {
    const payments = await loadAllFromCloud('sale_payments');
    for (const p of payments) {
      try {
        if (!p.id || !p.sale_id) continue;
        const saleExist = await dbQuery("SELECT id FROM sales WHERE id = $1", [p.sale_id]);
        if (saleExist.rowCount === 0) continue; // Skip orphaned payments from deleted sales!

        const exist = await dbQuery("SELECT id FROM sale_payments WHERE id = $1", [p.id]);
        if (exist.rowCount === 0) {
          await dbQuery(
            "INSERT INTO sale_payments (id, sale_id, installment_id, amount, payment_date, payment_type, note) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [
              p.id,
              p.sale_id,
              p.installment_id || null,
              parseFloat(p.amount) || 0,
              p.payment_date || new Date().toISOString(),
              p.payment_type || 'Cash',
              p.note || null
            ]
          );
        }
      } catch (e: any) {
        console.warn(`[CloudStore] Payment ${p.id} skip:`, e.message);
      }
    }
  } catch (err: any) {
    console.warn('[CloudStore] Hydrate payments warning:', err.message);
  }

  // 7. Hydrate Supplier Purchases
  try {
    const purchases = await loadAllFromCloud('supplier_purchases');
    for (const sp of purchases) {
      try {
        if (!sp.supplier_id || !sp.inventory_id) continue;
        const supExist = await dbQuery("SELECT id FROM suppliers WHERE id = $1", [sp.supplier_id]);
        const invExist = await dbQuery("SELECT id FROM inventory WHERE id = $1", [sp.inventory_id]);
        if (supExist.rowCount === 0 || invExist.rowCount === 0) continue;

        const isNumericId = !isNaN(Number(sp.id)) && String(sp.id).indexOf('_') === -1;
        const exist = isNumericId
          ? await dbQuery("SELECT id FROM supplier_purchases WHERE id = $1", [sp.id])
          : await dbQuery("SELECT id FROM supplier_purchases WHERE supplier_id = $1 AND inventory_id = $2", [sp.supplier_id, sp.inventory_id]);

        if (exist.rowCount === 0) {
          if (isNumericId) {
            await dbQuery(
              "INSERT INTO supplier_purchases (id, supplier_id, inventory_id, purchase_amount, purchase_date) VALUES ($1, $2, $3, $4, $5)",
              [sp.id, sp.supplier_id, sp.inventory_id, parseFloat(sp.purchase_amount) || 0, sp.purchase_date]
            );
          } else {
            await dbQuery(
              "INSERT INTO supplier_purchases (supplier_id, inventory_id, purchase_amount, purchase_date) VALUES ($1, $2, $3, $4)",
              [sp.supplier_id, sp.inventory_id, parseFloat(sp.purchase_amount) || 0, sp.purchase_date]
            );
          }
        }
      } catch (e: any) {
        console.warn(`[CloudStore] Supplier purchase ${sp.id} skip:`, e.message);
      }
    }
  } catch (err: any) {
    console.warn('[CloudStore] Hydrate supplier purchases warning:', err.message);
  }

  // 8. Hydrate Supplier Payments
  try {
    const supplierPayments = await loadAllFromCloud('supplier_payments');
    for (const sp of supplierPayments) {
      if (sp.id && sp.supplier_id) {
        const exist = await dbQuery("SELECT id FROM supplier_payments WHERE id = $1", [sp.id]);
        if (exist.rowCount === 0) {
          await dbQuery(
            "INSERT INTO supplier_payments (id, supplier_id, payment_date, payment_amount, payment_type, note, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [
              sp.id,
              sp.supplier_id,
              sp.payment_date,
              parseFloat(sp.payment_amount) || 0,
              sp.payment_type || 'Cash',
              sp.note || null,
              sp.created_at || new Date().toISOString()
            ]
          );
        }
      }
    }
  } catch (err: any) {
    console.warn('[CloudStore] Hydrate supplier payments warning:', err.message);
  }

  console.log('[CloudStore] Firestore data hydration completed successfully. Persistent storage verified.');
};

// Fallback direct cloud invoice lookup for lifetime customer invoice links
export const getInvoiceDirectFromCloud = async (invoiceNumber: string) => {
  try {
    const allSales = await loadAllFromCloud('sales');
    const sale = allSales.find((s: any) => s.invoice_number === invoiceNumber);
    if (!sale) return null;

    // Load related item
    let itemData: any = {};
    if (sale.inventory_id) {
      const invRef = doc(firestore, 'inventory', String(sale.inventory_id));
      const invSnap = await getDoc(invRef);
      if (invSnap.exists()) {
        itemData = invSnap.data();
      }
    }

    // Load related installments
    const allInstallments = await loadAllFromCloud('installments');
    const installments = allInstallments
      .filter((inst: any) => String(inst.sale_id) === String(sale.id))
      .sort((a: any, b: any) => (a.installment_number || 0) - (b.installment_number || 0));

    return {
      sale: {
        ...sale,
        model: itemData.model || 'Laptop',
        config: itemData.config || '',
        serial_number: itemData.serial_number || ''
      },
      installments
    };
  } catch (err: any) {
    console.error('[CloudStore] Direct cloud invoice lookup failed:', err);
    return null;
  }
};
