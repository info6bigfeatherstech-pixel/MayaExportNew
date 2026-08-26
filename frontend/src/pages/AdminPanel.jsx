import { useEffect, useMemo, useState, useCallback } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  Boxes,
  ClipboardList,
  Edit3,
  FileQuestion,
  LayoutDashboard,
  Menu,
  Package,
  Plus,
  Search,
  Trash2,
  Upload,
  Users,
  X,
} from "lucide-react"
import { getCategories, createCategory, updateCategory, deleteCategory } from "../api/categories.js"
import { getProducts, createProduct, updateProduct, deleteProduct } from "../api/products.js"
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from "../api/customers.js"
import { getOrders, createOrder, updateOrder, updateOrderStatus, deleteOrder } from "../api/orders.js"
import { getInquiries, createInquiry, updateInquiry, updateInquiryStatus, deleteInquiry } from "../api/inquiries.js"
import {
  initialCategories,
  initialCustomers,
  initialInquiries,
  initialOrders,
  initialProducts,
} from "../data/adminData.js"

const nav = [
  ["Overview", "/admin", LayoutDashboard],
  ["Products", "/admin/products", Package],
  ["Categories", "/admin/categories", Boxes],
  ["Customers", "/admin/customers", Users],
  ["Orders", "/admin/orders", ClipboardList],
  ["Inquiries", "/admin/inquiries", FileQuestion],
]
const orderStates = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]
const inquiryStates = ["New", "Contacted", "In Progress", "Converted", "Closed"]

const Badge = ({ value }) => (
  <span
    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${value === "Delivered" || value === "Active" || value === "Converted"
      ? "bg-emerald-50 text-emerald-700"
      : value === "Cancelled" || value === "Closed"
        ? "bg-rose-50 text-rose-700"
        : value === "Pending" || value === "New"
          ? "bg-amber-50 text-amber-700"
          : "bg-blue-50 text-blue-700"
      }`}
  >
    {value}
  </span>
)

const money = (v) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(v || 0))

export default function AdminPanel() {
  const location = useLocation()
  const navigate = useNavigate()
  const view = nav.find(([, path]) => path === location.pathname)?.[0] || "Overview"

  const [products, setProducts] = useState(initialProducts)
  const [categories, setCategories] = useState(initialCategories)
  const [customers, setCustomers] = useState(initialCustomers)
  const [orders, setOrders] = useState(initialOrders)
  const [inquiries, setInquiries] = useState(initialInquiries)

  const [menu, setMenu] = useState(false)
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("All")
  const [form, setForm] = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [profile, setProfile] = useState(null)
  const [notice, setNotice] = useState("")

  const alert = (text) => {
    setNotice(text)
    setTimeout(() => setNotice(""), 2600)
  }

  // Load database records on component mount
  const refreshFromAPI = useCallback(async () => {
    try {
      const [prodsRes, catsRes, custsRes, ordsRes, inqsRes] = await Promise.all([
        getProducts({ limit: 100 }).catch(() => null),
        getCategories().catch(() => null),
        getCustomers({ limit: 100 }).catch(() => null),
        getOrders({ limit: 100 }).catch(() => null),
        getInquiries({ limit: 100 }).catch(() => null),
      ])

      const fetchedProds = Array.isArray(prodsRes) ? prodsRes : prodsRes?.data
      if (fetchedProds && fetchedProds.length > 0) {
        setProducts(
          fetchedProds.map((p) => ({
            ...p,
            id: p.displayId || p._id || p.id,
            details: p.details || p.fabric,
            fabric: p.details || p.fabric,
            image: p.images?.[0] || p.image || "/placeholder.jpg",
            images: p.images?.length ? p.images : p.image ? [p.image] : ["/placeholder.jpg"],
            updatedAt: p.updatedAt ? new Date(p.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "Recently",
          }))
        )
      }

      const fetchedCats = Array.isArray(catsRes) ? catsRes : catsRes?.data
      if (fetchedCats && fetchedCats.length > 0) {
        setCategories(fetchedCats.map((c) => ({ ...c, id: c._id || c.id })))
      }

      const fetchedCusts = Array.isArray(custsRes) ? custsRes : custsRes?.data
      if (fetchedCusts && fetchedCusts.length > 0) {
        setCustomers(fetchedCusts.map((c) => ({ ...c, id: c.displayId || c._id || c.id })))
      }

      const fetchedOrds = Array.isArray(ordsRes) ? ordsRes : ordsRes?.data
      if (fetchedOrds && fetchedOrds.length > 0) {
        setOrders(fetchedOrds.map((o) => ({ ...o, id: o.displayId || o._id || o.id })))
      }

      const fetchedInqs = Array.isArray(inqsRes) ? inqsRes : inqsRes?.data
      if (fetchedInqs && fetchedInqs.length > 0) {
        setInquiries(fetchedInqs.map((i) => ({ ...i, id: i.displayId || i._id || i.id })))
      }
    } catch (e) {
      console.warn("API fetch notice:", e)
    }
  }, [])

  useEffect(() => {
    refreshFromAPI()
  }, [refreshFromAPI])

  const data =
    view === "Products"
      ? products
      : view === "Categories"
        ? categories
        : view === "Customers"
          ? customers
          : view === "Orders"
            ? orders
            : inquiries

  const filtered = useMemo(
    () =>
      data.filter(
        (row) =>
          Object.values(row).flat().join(" ").toLowerCase().includes(query.toLowerCase()) &&
          (filter === "All" || row.status === filter || row.category === filter)
      ),
    [data, query, filter]
  )

  // ── SAVE (Updates React State instantly & persists to MongoDB) ───────────────
  const save = async (type, record, imageFiles) => {
    const isEdit = Boolean(record._id || record.id)
    const targetId = record._id || record.id

    // 1. Instant UI update
    if (type === "product") {
      setProducts((all) =>
        isEdit
          ? all.map((x) => (x._id === targetId || x.id === targetId ? { ...x, ...record } : x))
          : [{ ...record, id: record.displayId || record.id || `PRD-${Date.now().toString().slice(-5)}` }, ...all]
      )
    } else if (type === "category") {
      setCategories((all) =>
        isEdit
          ? all.map((x) => (x._id === targetId || x.id === targetId ? { ...x, ...record } : x))
          : [{ ...record, id: `CAT-${Date.now().toString().slice(-5)}` }, ...all]
      )
    } else if (type === "customer") {
      setCustomers((all) =>
        isEdit
          ? all.map((x) => (x._id === targetId || x.id === targetId ? { ...x, ...record } : x))
          : [{ ...record, id: `CUS-${Date.now().toString().slice(-5)}` }, ...all]
      )
    } else if (type === "order") {
      setOrders((all) =>
        isEdit
          ? all.map((x) => (x._id === targetId || x.id === targetId ? { ...x, ...record } : x))
          : [{ ...record, id: `ORD-${Date.now().toString().slice(-5)}` }, ...all]
      )
    } else if (type === "inquiry") {
      setInquiries((all) =>
        isEdit
          ? all.map((x) => (x._id === targetId || x.id === targetId ? { ...x, ...record } : x))
          : [{ ...record, id: `INQ-${Date.now().toString().slice(-5)}` }, ...all]
      )
    }

    setForm(null)
    alert(`${type[0].toUpperCase() + type.slice(1)} saved`)

    // 2. Persist to MongoDB Atlas via Backend API
    try {
      if (type === "product") {
        if (record._id) {
          await updateProduct(record._id, record, imageFiles)
        } else if (record.id && (record.id.startsWith("GE-") || record.id.startsWith("FB-") || record.id.startsWith("FT-") || record.id.startsWith("HT-") || record.id.startsWith("EA-"))) {
          await updateProduct(record.id, record, imageFiles)
        } else {
          const created = await createProduct(record, imageFiles)
          if (created?._id) {
            setProducts((all) =>
              all.map((p) => (p.id === record.id ? { ...p, _id: created._id, id: created.displayId || p.id } : p))
            )
          }
        }
      } else if (type === "category") {
        if (record._id) await updateCategory(record._id, record, imageFiles?.[0])
        else await createCategory(record, imageFiles?.[0])
      } else if (type === "customer") {
        if (record._id) await updateCustomer(record._id, record)
        else await createCustomer(record)
      } else if (type === "order") {
        if (record._id) await updateOrder(record._id, record)
        else await createOrder(record)
      } else if (type === "inquiry") {
        if (record._id) await updateInquiry(record._id, record)
        else await createInquiry(record)
      }
    } catch (err) {
      console.warn("API save:", err.message)
    }
  }

  // ── DELETE (Removes from React State & deletes from MongoDB) ─────────────────
  const remove = async () => {
    const { type, item } = confirm
    const targetId = item._id || item.id

    if (type === "product") setProducts((all) => all.filter((x) => (x._id || x.id) !== targetId))
    if (type === "category") setCategories((all) => all.filter((x) => (x._id || x.id) !== targetId))
    if (type === "customer") setCustomers((all) => all.filter((x) => (x._id || x.id) !== targetId))
    if (type === "order") setOrders((all) => all.filter((x) => (x._id || x.id) !== targetId))
    if (type === "inquiry") setInquiries((all) => all.filter((x) => (x._id || x.id) !== targetId))

    setConfirm(null)
    alert(`${confirm.type[0].toUpperCase() + confirm.type.slice(1)} deleted`)

    try {
      const deleteId = item._id || item.id
      if (type === "product") await deleteProduct(deleteId)
      if (type === "category" && item._id) await deleteCategory(item._id)
      if (type === "customer" && item._id) await deleteCustomer(item._id)
      if (type === "order" && item._id) await deleteOrder(item._id)
      if (type === "inquiry" && item._id) await deleteInquiry(item._id)
    } catch (e) {
      console.warn("API delete:", e.message)
    }
  }

  // ── STATUS CHANGE ───────────────────────────────────────────────────────────
  const handleStatusChange = (type, id, status) => {
    if (type === "order") {
      setOrders((all) => all.map((x) => ((x._id || x.id) === id ? { ...x, status } : x)))
      const ord = orders.find((x) => (x._id || x.id) === id)
      if (ord?._id) updateOrderStatus(ord._id, status).catch(() => { })
    } else {
      setInquiries((all) => all.map((x) => ((x._id || x.id) === id ? { ...x, status } : x)))
      const inq = inquiries.find((x) => (x._id || x.id) === id)
      if (inq?._id) updateInquiryStatus(inq._id, status).catch(() => { })
    }
  }

  const statuses =
    view === "Orders"
      ? orderStates
      : view === "Inquiries"
        ? inquiryStates
        : view === "Products" || view === "Categories"
          ? ["Active", "Draft"]
          : ["Active", "Prospect"]

  const addType =
    view === "Products"
      ? "product"
      : view === "Categories"
        ? "category"
        : view === "Customers"
          ? "customer"
          : view === "Orders"
            ? "order"
            : "inquiry"

  return (
    <div className="min-h-screen bg-stone-50 text-charcoal">
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-ink text-ivory transition-transform lg:translate-x-0 ${menu ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
          <div>
            <p className="font-serif text-xl">Maya Exports</p>
            <p className="mt-1 text-[10px] uppercase tracking-[.2em] text-stone-400">Admin portal</p>
          </div>
          <button className="lg:hidden" onClick={() => setMenu(false)}>
            <X />
          </button>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {nav.map(([label, path, Icon]) => (
            <button
              key={label}
              onClick={() => {
                navigate(path)
                setMenu(false)
                setQuery("")
                setFilter("All")
              }}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm ${view === label ? "bg-bronze text-white" : "text-stone-300 hover:bg-white/10"
                }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
        <Link to="/" className="border-t border-white/10 px-8 py-5 text-sm text-stone-300">
          View website
        </Link>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-charcoal/10 bg-stone-50/95 px-5 backdrop-blur lg:px-10">
          <button className="lg:hidden" onClick={() => setMenu(true)}>
            <Menu />
          </button>
          <div className="hidden lg:block">
            <p className="text-xs uppercase tracking-widest text-stone-500">Maya Import & Export</p>
            <p className="text-sm font-medium">Administration workspace</p>
          </div>
          <div className="rounded-full bg-charcoal px-3 py-2 text-xs font-bold text-ivory">AS</div>
        </header>

        <main className="p-5 lg:p-10">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Operations</p>
              <h1 className="mt-2 font-serif text-4xl font-semibold">
                {view === "Overview" ? "Good morning, Admin" : view}
              </h1>
              <p className="mt-2 text-sm text-stone-500">
                {view === "Overview"
                  ? "Manage your international trading operations in one place."
                  : `Manage ${view.toLowerCase()} with connected business records.`}
              </p>
            </div>
            {view !== "Overview" && (
              <button
                onClick={() => setForm({ type: addType, item: null })}
                className="inline-flex items-center gap-2 bg-charcoal px-5 py-3 text-xs font-semibold uppercase tracking-widest text-ivory hover:bg-bronze"
              >
                <Plus size={16} />
                Add {addType}
              </button>
            )}
          </div>

          {view === "Overview" ? (
            <Overview
              products={products}
              categories={categories}
              customers={customers}
              orders={orders}
              inquiries={inquiries}
            />
          ) : (
            <>
              <div className="mb-5 flex flex-col gap-3 sm:flex-row">
                <label className="flex flex-1 items-center gap-2 border border-charcoal/10 bg-white px-3 py-2.5">
                  <Search size={17} className="text-stone-400" />
                  <input
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder={`Search ${view.toLowerCase()}...`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
                <select
                  className="border border-charcoal/10 bg-white px-3 text-sm"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option>All</option>
                  {(view === "Products" ? categories.map((c) => c.name) : statuses).map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </div>

              <Records
                type={addType}
                rows={filtered}
                products={products}
                customers={customers}
                categories={categories}
                onEdit={(item) => setForm({ type: addType, item })}
                onDelete={(item) => setConfirm({ type: addType, item })}
                onProfile={setProfile}
                onStatus={(id, status) => handleStatusChange(addType, id, status)}
              />
            </>
          )}

          {notice && (
            <div className="fixed bottom-6 right-6 z-[90] bg-charcoal px-5 py-3 text-sm text-ivory shadow-xl">
              {notice}
            </div>
          )}

          {form && (
            <Editor
              {...form}
              products={products}
              customers={customers}
              categories={categories}
              onSave={save}
              onClose={() => setForm(null)}
            />
          )}

          {confirm && (
            <Confirm
              type={confirm.type}
              item={confirm.item}
              onClose={() => setConfirm(null)}
              onConfirm={remove}
            />
          )}

          {profile && (
            <Profile
              customer={profile}
              orders={orders.filter(
                (o) =>
                  (o.customerId?._id || o.customerId) === (profile._id || profile.id) ||
                  o.customer === profile.company
              )}
              inquiries={inquiries.filter(
                (i) =>
                  (i.customerId?._id || i.customerId) === (profile._id || profile.id) ||
                  i.company === profile.company
              )}
              onClose={() => setProfile(null)}
              onEdit={() => {
                setForm({ type: "customer", item: profile })
                setProfile(null)
              }}
            />
          )}
        </main>
      </div>

      {menu && <button className="fixed inset-0 z-40 bg-ink/40 lg:hidden" onClick={() => setMenu(false)} />}
    </div>
  )
}

function Overview({ products, categories, customers, orders, inquiries }) {
  const cards = [
    ["Products", products.length, Package],
    ["Categories", categories.length, Boxes],
    ["Customers", customers.length, Users],
    ["Open orders", orders.filter((x) => ["Pending", "Processing"].includes(x.status)).length, ClipboardList],
  ]

  return (
    <div className="space-y-7">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([l, n, I]) => (
          <div key={l} className="border border-charcoal/10 bg-white p-5">
            <div className="flex justify-between text-xs uppercase tracking-wider text-stone-500">
              {l}
              <I size={18} className="text-bronze" />
            </div>
            <p className="mt-5 font-serif text-4xl font-semibold">{n}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-7 xl:grid-cols-2">
        <section className="border border-charcoal/10 bg-white p-6">
          <h2 className="font-serif text-2xl font-semibold">Recent orders</h2>
          <div className="mt-4 space-y-3">
            {orders.slice(0, 4).map((o) => (
              <div className="flex justify-between border-t border-charcoal/10 pt-3" key={o._id || o.id}>
                <div>
                  <p className="text-sm font-semibold">
                    {o.displayId || o.id} · {o.customer}
                  </p>
                  <p className="text-xs text-stone-500">{o.products}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{money(o.value)}</p>
                  <Badge value={o.status} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-charcoal p-6 text-ivory">
          <p className="eyebrow text-bronze-light">Buyer pipeline</p>
          <h2 className="mt-2 font-serif text-3xl">
            {inquiries.filter((i) => !["Closed", "Converted"].includes(i.status)).length} active opportunities
          </h2>
          <p className="mt-6 text-sm leading-6 text-stone-300">
            All orders and inquiries are tied to a customer record, giving your team complete account context.
          </p>
        </section>
      </div>
    </div>
  )
}

function Records({ type, rows, products, customers, categories, onEdit, onDelete, onProfile, onStatus }) {
  if (!rows.length)
    return (
      <div className="border border-charcoal/10 bg-white py-16 text-center text-sm text-stone-500">
        No records match your filters.
      </div>
    )

  if (type === "product")
    return (
      <Table heads={["Product", "Product code", "Category", "Images", "Status", ""]}>
        {rows.map((p) => {
          const pCode = p.displayId || p.id
          return (
            <tr key={p._id || p.id}>
              <td>
                <div className="flex items-center gap-3">
                  <img
                    className="h-10 w-10 object-cover"
                    src={p.images?.[0] || p.image || "/placeholder.jpg"}
                    alt={p.name}
                  />
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-xs text-stone-500">{p.productType}</p>
                  </div>
                </div>
              </td>
              <td>
                <span className="bg-stone-100 px-2 py-1 font-mono text-xs text-stone-700">
                  {pCode}
                </span>
              </td>
              <td>{p.category}</td>
              <td>{p.images?.length || (p.image ? 1 : 0)}</td>
              <td>
                <Badge value={p.status} />
              </td>
              <td>
                <Actions edit={() => onEdit(p)} del={() => onDelete(p)} />
              </td>
            </tr>
          )
        })}
      </Table>
    )

  if (type === "category")
    return (
      <Table heads={["Category", "Subcategories", "Products", "Status", ""]}>
        {rows.map((c) => {
          const cId = c._id || c.id
          const catName = c.name
          const count = products.filter(
            (p) => (p.categoryId?._id || p.categoryId) === cId || p.category === catName
          ).length
          return (
            <tr key={cId}>
              <td>
                <p className="font-semibold">{c.name}</p>
                <p className="text-xs text-stone-500">/{c.slug}</p>
              </td>
              <td>{Array.isArray(c.subcategories) ? c.subcategories.join(", ") : c.subcategories}</td>
              <td>{count}</td>
              <td>
                <Badge value={c.status} />
              </td>
              <td>
                <Actions edit={() => onEdit(c)} del={() => onDelete(c)} />
              </td>
            </tr>
          )
        })}
      </Table>
    )

  if (type === "customer")
    return (
      <Table heads={["Customer", "Contact", "Market", "Status", ""]}>
        {rows.map((c) => (
          <tr key={c._id || c.id}>
            <td>
              <button className="text-left hover:text-bronze" onClick={() => onProfile(c)}>
                <p className="font-semibold">{c.company}</p>
                <p className="text-xs text-stone-500">{c.name}</p>
              </button>
            </td>
            <td>
              <p>{c.email}</p>
              <p className="text-xs text-stone-500">{c.phone || "No phone"}</p>
            </td>
            <td>{c.country}</td>
            <td>
              <Badge value={c.status} />
            </td>
            <td>
              <Actions edit={() => onEdit(c)} del={() => onDelete(c)} />
            </td>
          </tr>
        ))}
      </Table>
    )

  if (type === "order")
    return (
      <Table heads={["Order", "Customer", "Products", "Value", "Status", ""]}>
        {rows.map((o) => {
          const oId = o._id || o.id
          const c = customers.find(
            (x) => (x._id || x.id) === (o.customerId?._id || o.customerId) || x.company === o.customer
          )
          return (
            <tr key={oId}>
              <td>
                <p className="font-semibold">{o.displayId || o.id}</p>
                <p className="text-xs text-stone-500">{o.date}</p>
              </td>
              <td>
                <button onClick={() => c && onProfile(c)} className="hover:text-bronze">
                  {o.customer || c?.company}
                </button>
              </td>
              <td>{o.products}</td>
              <td>{money(o.value)}</td>
              <td>
                <select
                  className="bg-transparent text-xs font-semibold outline-none"
                  value={o.status}
                  onChange={(e) => onStatus(oId, e.target.value)}
                >
                  {orderStates.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </td>
              <td>
                <Actions edit={() => onEdit(o)} del={() => onDelete(o)} />
              </td>
            </tr>
          )
        })}
      </Table>
    )

  return (
    <div className="divide-y divide-charcoal/10 border border-charcoal/10 bg-white">
      {rows.map((i) => {
        const iId = i._id || i.id
        const c = customers.find(
          (x) => (x._id || x.id) === (i.customerId?._id || i.customerId) || x.company === i.company
        )
        return (
          <div key={iId} className="flex flex-col gap-3 p-5 md:flex-row md:justify-between">
            <div>
              <button
                className="font-semibold hover:text-bronze"
                onClick={() => c && onProfile(c)}
              >
                {c?.company || i.company || i.name}
              </button>
              <p className="mt-1 text-xs text-stone-500">
                {i.product} · Quantity: {i.quantity || "—"} · {i.date}
              </p>
              <p className="mt-2 text-sm text-stone-600">{i.message}</p>
            </div>
            <div className="flex items-start gap-2">
              <select
                className="rounded border border-charcoal/10 bg-stone-50 px-2 py-1 text-xs font-semibold outline-none"
                value={i.status}
                onChange={(e) => onStatus(iId, e.target.value)}
              >
                {inquiryStates.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              <Actions edit={() => onEdit(i)} del={() => onDelete(i)} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Table({ heads, children }) {
  return (
    <div className="overflow-x-auto border border-charcoal/10 bg-white">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-stone-50 text-[11px] uppercase tracking-widest text-stone-500">
          <tr>
            {heads.map((h, i) => (
              <th className="p-4" key={i}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_td]:border-t [&_td]:border-charcoal/10 [&_td]:p-4">{children}</tbody>
      </table>
    </div>
  )
}

function Actions({ edit, del }) {
  return (
    <div className="flex justify-end gap-1">
      <button type="button" onClick={edit} className="p-2 text-stone-500 hover:text-bronze">
        <Edit3 size={16} />
      </button>
      <button type="button" onClick={del} className="p-2 text-stone-500 hover:text-rose-600">
        <Trash2 size={16} />
      </button>
    </div>
  )
}

function Confirm({ type, item, onClose, onConfirm }) {
  return (
    <Modal title={`Delete ${type}`} onClose={onClose}>
      <p className="text-sm leading-6 text-stone-600">
        Delete <b>{item.name || item.company || item.displayId || item.id}</b>? This cannot be undone.
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <Button plain onClick={onClose} type="button">
          Cancel
        </Button>
        <Button danger onClick={onConfirm} type="button">
          Delete
        </Button>
      </div>
    </Modal>
  )
}

function Editor({ type, item, products, categories, customers, onSave, onClose }) {
  const [images, setImages] = useState(
    item?.images?.length ? item.images : item?.image ? [item.image] : []
  )
  const [imageFiles, setImageFiles] = useState([])
  const v = item || {}

  const submit = (e) => {
    e.preventDefault()
    let d = Object.fromEntries(new FormData(e.currentTarget))

    const selectedCat = categories.find(
      (x) => (x._id || x.id) === d.categoryId || x.name === d.categoryId
    )
    const selectedCust = customers.find(
      (x) => (x._id || x.id) === d.customerId || x.company === d.customerId
    )
    const selectedProd = products.find(
      (x) => (x._id || x.id) === d.productId || x.name === d.productId
    )

    if (type === "product") {
      d = {
        ...v,
        ...d,
        name: d.name,
        displayId: d.displayId || v.displayId || v.id,
        id: d.displayId || v.displayId || v.id,
        categoryId: selectedCat?._id || selectedCat?.id || d.categoryId,
        category: selectedCat?.name || d.category || categories[0]?.name,
        productType: d.subcategory || d.productType,
        details: d.details || d.fabric,
        fabric: d.details || d.fabric,
        moq: d.moq,
        description: d.description,
        status: d.status || "Active",
        images: images.length ? images : [v.image || "/placeholder.jpg"],
        image: images[0] || v.image || "/placeholder.jpg",
        updatedAt: "Just now",
      }
    }
    if (type === "category") {
      d = {
        ...v,
        ...d,
        subcategories: Array.isArray(d.subcategories)
          ? d.subcategories
          : d.subcategories
            ?.split(",")
            .map((x) => x.trim())
            .filter(Boolean) || [],
        slug: d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      }
    }
    if (type === "customer") {
      d = {
        ...v,
        ...d,
        spend: Number(v.spend || 0),
        orders: Number(v.orders || 0),
      }
    }
    if (type === "order") {
      d = {
        ...v,
        ...d,
        customerId: selectedCust?._id || selectedCust?.id || d.customerId,
        productId: selectedProd?._id || selectedProd?.id || d.productId,
        customer: selectedCust?.company || d.customer,
        country: selectedCust?.country || d.country,
        products: `${selectedProd?.name || "Product"} × ${d.quantity}`,
        quantity: Number(d.quantity),
        value: Number(d.value),
      }
    }
    if (type === "inquiry") {
      d = {
        ...v,
        ...d,
        customerId: selectedCust?._id || selectedCust?.id || d.customerId,
        productId: selectedProd?._id || selectedProd?.id || d.productId,
        name: selectedCust?.name || d.name,
        company: selectedCust?.company || d.company,
        country: selectedCust?.country || d.country,
        product: selectedProd?.name || d.product,
        quantity: d.quantity ? Number(d.quantity) : undefined,
      }
    }

    onSave(type, d, imageFiles)
  }

  const upload = (e) => {
    const fs = Array.from(e.target.files)
    setImageFiles(fs)
    Promise.all(
      fs.map(
        (f) =>
          new Promise((r) => {
            const rd = new FileReader()
            rd.onload = () => r(rd.result)
            rd.readAsDataURL(f)
          })
      )
    ).then((xs) => setImages((a) => [...a, ...xs]))
  }

  return (
    <Modal title={`${item ? "Edit" : "Add"} ${type}`} onClose={onClose} wide>
      <form onSubmit={submit} className="grid gap-4 p-6 md:grid-cols-2">
        {type === "product" && (
          <>
            <Field l="Product name" n="name" v={v.name} req />
            <Field l="Product Code" n="displayId" v={v.displayId || v.id} req />
            <Select
              l="Category"
              n="categoryId"
              v={v.categoryId?._id || v.categoryId || categories.find((c) => c.name === v.category)?._id || categories[0]?._id || categories[0]?.id}
              o={categories.map((c) => [c._id || c.id, c.name])}
            />
            <Field l="Subcategory" n="subcategory" v={v.productType} req />
            <Field l="MOQ" n="moq" v={v.moq} />
            <Field l="Description" n="description" v={v.description} area />
            <Field l="Specifications / Fabric" n="details" v={v.details || v.fabric} area />
            <Select l="Status" n="status" v={v.status || "Active"} o={["Active", "Draft"]} />
            <ImageField
              images={images}
              upload={upload}
              remove={(i) => setImages((a) => a.filter((_, n) => n !== i))}
            />
          </>
        )}
        {type === "category" && (
          <>
            <Field l="Category name" n="name" v={v.name} req />
            <Select l="Status" n="status" v={v.status || "Active"} o={["Active", "Draft"]} />
            <Field l="Description" n="description" v={v.description} area />
            <Field
              l="Subcategories (comma separated)"
              n="subcategories"
              v={Array.isArray(v.subcategories) ? v.subcategories.join(", ") : v.subcategories}
              area
            />
          </>
        )}
        {type === "customer" && (
          <>
            <Field l="Contact name" n="name" v={v.name} req />
            <Field l="Company" n="company" v={v.company} req />
            <Field l="Email" n="email" v={v.email} kind="email" req />
            <Field l="Phone" n="phone" v={v.phone} />
            <Field l="Country" n="country" v={v.country} req />
            <Select l="Status" n="status" v={v.status || "Active"} o={["Active", "Prospect"]} />
            <Field l="Address" n="address" v={v.address} area />
            <Field l="Customer notes (internal)" n="notes" v={v.notes} area />
          </>
        )}
        {type === "order" && (
          <>
            <Select
              l="Customer"
              n="customerId"
              v={v.customerId?._id || v.customerId || customers[0]?._id || customers[0]?.id}
              o={customers.map((c) => [c._id || c.id, `${c.company} — ${c.name}`])}
            />
            <Select
              l="Product"
              n="productId"
              v={v.productId?._id || v.productId || products[0]?._id || products[0]?.id}
              o={products.map((p) => [p._id || p.id, p.name])}
            />
            <Field l="Quantity" n="quantity" v={v.quantity} kind="number" req />
            <Field l="Order value (USD)" n="value" v={v.value} kind="number" req />
            <Field
              l="Order date"
              n="date"
              v={v.date || new Date().toISOString().slice(0, 10)}
              req
            />
            <Select l="Order status" n="status" v={v.status || "Pending"} o={orderStates} />
            <Field l="Shipping information" n="shipping" v={v.shipping} area />
          </>
        )}
        {type === "inquiry" && (
          <>
            <Select
              l="Customer"
              n="customerId"
              v={v.customerId?._id || v.customerId || customers[0]?._id || customers[0]?.id}
              o={customers.map((c) => [c._id || c.id, `${c.company} — ${c.name}`])}
            />
            <Select
              l="Product"
              n="productId"
              v={v.productId?._id || v.productId || products[0]?._id || products[0]?.id}
              o={products.map((p) => [p._id || p.id, p.name])}
            />
            <Field l="Quantity" n="quantity" v={v.quantity} kind="number" />
            <Field
              l="Inquiry date"
              n="date"
              v={v.date || new Date().toISOString().slice(0, 10)}
              req
            />
            <Select l="Inquiry status" n="status" v={v.status || "New"} o={inquiryStates} />
            <Field l="Message" n="message" v={v.message} area req />
          </>
        )}
        <div className="col-span-full flex justify-end gap-3 border-t border-charcoal/10 pt-5">
          <Button plain onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit">
            Save {type}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

function Modal({ title, children, onClose, wide }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/50 p-4">
      <div
        className={`max-h-[92vh] w-full overflow-y-auto bg-ivory shadow-2xl ${wide ? "max-w-4xl" : "max-w-lg"
          }`}
      >
        <div className="sticky top-0 flex justify-between border-b border-charcoal/10 bg-ivory px-6 py-5">
          <h2 className="font-serif text-2xl font-semibold">{title}</h2>
          <button type="button" onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

function Field({ l, n, v, req, area, kind = "text" }) {
  return (
    <label className={area ? "md:col-span-2" : ""}>
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-stone-600">
        {l}
      </span>
      {area ? (
        <textarea
          className="w-full border border-charcoal/15 bg-white px-3 py-2 text-sm outline-none focus:border-bronze"
          rows="3"
          name={n}
          defaultValue={v}
          required={req}
        />
      ) : (
        <input
          className="w-full border border-charcoal/15 bg-white px-3 py-2 text-sm outline-none focus:border-bronze"
          type={kind}
          name={n}
          defaultValue={v}
          required={req}
        />
      )}
    </label>
  )
}

function Select({ l, n, v, o }) {
  return (
    <label>
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-stone-600">
        {l}
      </span>
      <select
        className="w-full border border-charcoal/15 bg-white px-3 py-2 text-sm outline-none focus:border-bronze"
        name={n}
        defaultValue={v}
      >
        {o.map((x) => (
          <option key={Array.isArray(x) ? x[0] : x} value={Array.isArray(x) ? x[0] : x}>
            {Array.isArray(x) ? x[1] : x}
          </option>
        ))}
      </select>
    </label>
  )
}

function ImageField({ images, upload, remove }) {
  return (
    <div className="md:col-span-2">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-stone-600">
        Product images
      </p>
      <label className="flex cursor-pointer items-center justify-center gap-2 border border-dashed border-charcoal/25 p-5 text-sm text-stone-600 hover:border-bronze">
        <Upload size={17} />
        Upload local images
        <input className="sr-only" type="file" accept="image/*" multiple onChange={upload} />
      </label>
      {!!images.length && (
        <div className="mt-3 flex flex-wrap gap-3">
          {images.map((x, i) => (
            <div className="relative" key={i}>
              <img className="h-20 w-20 object-cover" src={x} alt="" />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute right-0 top-0 bg-ink p-1 text-white"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Button({ children, onClick, plain, danger, type = "submit" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${plain
        ? "border border-charcoal/15 text-charcoal hover:bg-stone-100"
        : danger
          ? "bg-rose-600 text-white hover:bg-rose-700"
          : "bg-charcoal text-ivory hover:bg-bronze"
        } px-4 py-2.5 text-xs font-semibold uppercase tracking-widest`}
    >
      {children}
    </button>
  )
}

function Profile({ customer, orders, inquiries, onClose, onEdit }) {
  return (
    <Modal title="Customer profile" onClose={onClose} wide>
      <div className="flex justify-between border-b border-charcoal/10 pb-5">
        <div>
          <p className="eyebrow">Buyer account</p>
          <h3 className="mt-2 font-serif text-3xl font-semibold">{customer.name}</h3>
          <p className="mt-1 text-sm text-stone-600">
            {customer.company} · {customer.country}
          </p>
        </div>
        <Button plain onClick={onEdit} type="button">
          Edit customer
        </Button>
      </div>
      <div className="grid gap-4 py-5 md:grid-cols-3">
        <Info l="Email" v={customer.email} />
        <Info l="Phone" v={customer.phone || "Not recorded"} />
        <Info l="Address" v={customer.address || "Not recorded"} />
      </div>
      <section className="border-t border-charcoal/10 py-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
          Internal notes
        </p>
        <p className="mt-2 text-sm leading-6">{customer.notes || "No notes recorded."}</p>
      </section>
      <div className="grid gap-6 border-t border-charcoal/10 pt-5 md:grid-cols-2">
        <Activity
          title={`Orders (${orders.length})`}
          records={orders}
          empty="No associated orders."
          render={(o) => (
            <>
              <p className="font-semibold">
                {o.displayId || o.id} · {money(o.value)}
              </p>
              <p className="text-xs text-stone-500">{o.products}</p>
              <Badge value={o.status} />
            </>
          )}
        />
        <Activity
          title={`Inquiries (${inquiries.length})`}
          records={inquiries}
          empty="No associated inquiries."
          render={(i) => (
            <>
              <p className="font-semibold">
                {i.product || "Inquiry"} · Qty {i.quantity || "—"}
              </p>
              <p className="text-xs text-stone-500">{i.date}</p>
              <Badge value={i.status} />
            </>
          )}
        />
      </div>
    </Modal>
  )
}

function Info({ l, v }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">{l}</p>
      <p className="mt-1 text-sm">{v}</p>
    </div>
  )
}

function Activity({ title, records, empty, render }) {
  return (
    <section>
      <h4 className="font-serif text-xl font-semibold">{title}</h4>
      {records.length ? (
        <div className="mt-3 space-y-2">
          {records.map((x) => (
            <div key={x._id || x.id} className="border border-charcoal/10 bg-white p-3 text-sm">
              {render(x)}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-stone-500">{empty}</p>
      )}
    </section>
  )
}
