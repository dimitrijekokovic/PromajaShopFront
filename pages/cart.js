import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Input from "@/components/Input";
import Modal, { ModalHeader, ModalText, ButtonWrapper, ModalButton } from "@/components/Modal";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

const ColumnsWrapper = styled.div`
     display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 40px;
    margin-top: 40px;
    
    @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Na mobilnom uređaju sadržaj ide vertikalno */
    gap: 20px;
    margin-right:25px;
        margin-left:25px;

  }
`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    overflow-x: auto; /* Sprečava prelamanje sadržaja */
    max-width: 100%; /* Ograničava širinu na roditelja */

    @media (max-width: 768px) {
    padding: 15px;
    margin: 0; /* Uklanja marginu sa strane */
  }
`;

const ProductInfoCell = styled.td`
    padding: 10px 0;
`;

const ProductImageBox = styled.div`
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, .1);
    display:flex;
    align-items:center;
    justify-content: center;
    border-radius: 10px;
    img {
        max-width:80px;
        max-height:80px;
    }
`;

const CitHolder = styled.div`
    display:flex;
    gap:5px;
`;

const StyledButton = styled.button`
    padding: 0;
    font-size: 16px;
    width: 32px; /* Širina dugmeta */
    height: 32px; /* Visina dugmeta */
    display: flex;
    margin-right: 5px;
    margin-left: 5px;
    align-items: center;
    justify-content: center;
    background-color: #ccc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #e68a00;
    }
`;

const StyledQuantityLabel = styled.div`
    display: inline-flex;
    font-size: 16px;
    font-weight: normal;
    text-align: center;
    line-height: 32px; /* Poravnanje sa dugmadi */
    width: 100px; /* Dimenzija koja odgovara dugmadi */
`;

const InfoBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  margin-top:15px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 15px;
    
  }
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: #333;

  svg {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    color: #444;
  }

  span {
    font-size: 14px;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 20px;
    margin-left:25px;
    margin-right:25px;
  }
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background-color: #ffffff;
    border-radius: 5px;
    margin-right: 15px;
    svg {
        width: 80px;
        height: 35px;
        color:#222222;
    }
`;



const Highlight = styled.span`
    color: #28a745;
    font-weight: bold;
`;

const Highlight2 = styled.span`
    color: #F69450;
    font-weight: bold;
`;
const Highlight3 = styled.span`
    color: red;
    font-weight: bold;
`;

const StyledModalButton = styled(ModalButton)`
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

function getStockLimit(product) {
    const stock = Number(product?.stock);
    return Number.isFinite(stock) ? Math.max(0, stock) : Infinity;
}

function buildSyncedCartIds(cartIds, products) {
    const productsById = new Map(products.map((product) => [product._id, product]));
    const counts = {};
    const syncedIds = [];

    cartIds.forEach((id) => {
        const product = productsById.get(id);

        if (!product) {
            return;
        }

        const currentQuantity = counts[id] || 0;

        if (currentQuantity >= getStockLimit(product)) {
            return;
        }

        counts[id] = currentQuantity + 1;
        syncedIds.push(id);
    });

    return syncedIds;
}

function arraysMatch(first, second) {
    if (first.length !== second.length) return false;
    return first.every((item, index) => item === second[index]);
}

export default function CartPage() {
    const [showModal, setShowModal] = useState(false);
    const { cartProducts, addProductWithLimit, removeProduct, clearCart, user, setUser, setCartProducts } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [cartLoading, setCartLoading] = useState(false);
    const [cartNotice, setCartNotice] = useState("");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country] = useState('Srbija');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [showThankYouModal, setShowThankYouModal] = useState(false);

    const handleProceedClick = (e) => {
        e.preventDefault();
        if (!user || !user.email) {
            setShowModal(true); // Ako korisnik nije prijavljen, prikaži modal za registraciju
            return;
        }
        if (total < 1000) {
            setShowWarningModal(true); // Ako ukupan iznos nije dovoljan, prikaži upozorenje
            return;
        }
        setShowConfirmModal(true); // Prikaži potvrdu narudžbine
    };
    

    useEffect(() => {
        if (!user || !user.email) {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    if (parsedUser?.email) {
                        setUser(parsedUser); // Postavi korisnika iz localStorage
                    } else {
                        setShowModal(true); // Prikaži modal za registraciju
                    }
                } catch (e) {
                    console.error("Greška prilikom parsiranja korisnika:", e);
                    setShowModal(true); // Prikaži modal za registraciju
                }
            } else {
                setShowModal(true); // Prikaži modal za registraciju
            }
        }
    }, [user, setUser]);

    useEffect(() => {
        if (!user?.email) return;

        const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

        setEmail(user.email);
        setName((currentName) => currentName || fullName || user.name || "");
        setPhoneNumber((currentPhone) => currentPhone || user.phoneNumber || "");
    }, [user]);
    

    useEffect(() => {
        if (cartProducts?.length > 0) {
            setCartLoading(true);
            axios.post('/api/products', { ids: cartProducts }).then(response => {
                const fetchedProducts = Array.isArray(response.data) ? response.data : [];
                const syncedCartProducts = buildSyncedCartIds(cartProducts, fetchedProducts);

                setProducts(fetchedProducts.filter(product => syncedCartProducts.includes(product._id)));

                if (!arraysMatch(cartProducts, syncedCartProducts)) {
                    const removedCount = cartProducts.length - syncedCartProducts.length;
                    setCartProducts(syncedCartProducts);
                    setCartNotice(
                        removedCount > 0
                            ? "Korpa je ažurirana prema trenutnom stanju proizvoda."
                            : ""
                    );
                }
            }).catch(error => {
                console.error("Greška prilikom učitavanja korpe:", error);
                setProducts([]);
            }).finally(() => {
                setCartLoading(false);
            });
        } else {
            setProducts([]);
            setCartNotice("");
            setCartLoading(false);
        }
    }, [cartProducts, setCartProducts]);

    const getCartQuantity = (id) => {
        return cartProducts.filter(productId => productId === id).length;
    };

    const moreOfThisProduct = (product) => {
        addProductWithLimit(product._id, product.stock);
    };

    const lessOfThisProduct = (id) => {
        removeProduct(id);
    };

    let total = 0;
    if (Array.isArray(cartProducts)) {
        for (const productId of cartProducts) {
            const price = products.find(p => p._id === productId)?.price || 0;
            total += price;
        }
    }

    const handleOrderSubmit = async () => {
        const cartProductsDetailed = products
            .map(product => ({
                productId: product._id,
                quantity: Math.min(getCartQuantity(product._id), getStockLimit(product)),
            }))
            .filter(product => product.quantity > 0);

        if (cartProductsDetailed.length === 0) {
            clearCart();
            return;
        }

        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email: user?.email || email,
                phoneNumber,
                city,
                postalCode,
                streetAddress,
                country: country || "Srbija",
                cartProducts: cartProductsDetailed,
            }),
        });

        if (response.ok) {
            clearCart();
            setShowConfirmModal(false);
            setShowThankYouModal(true);
        }
    };

    

    

    let shippingCost = total > 5000 ? 0 : 420;
    const hasValidCartItems = products.length > 0;

    return (
        <>
            <Header />
            <Center>
                <InfoBar>
                    <InfoBox>
                        <IconWrapper>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
                                <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
                                <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                            </svg>
                        </IconWrapper>
                        <span>
                            Za porudžbine preko <Highlight>5,000 RSD</Highlight>, poštarina je <Highlight>BESPLATNA</Highlight>. Dostava se vrši samo na teritoriji Republike Srbije. Minimalni iznos pojedinačne porudžbine je <Highlight3>1,000 RSD</Highlight3>.
                        </span>
                    </InfoBox>
                    <InfoBox>
                        <IconWrapper>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                            </svg>
                        </IconWrapper>
                        <span>
                            Šaljemo <Highlight2>PostExpress</Highlight2>-om. Porudžbine koje su naručene pre 12:00h stižu narednog dana. Porudžbine koje su naručene posle 12:00h šalju se sledeći dan i isporuka dolazi dan posle pošiljke.
                        </span>
                    </InfoBox>
                </InfoBar>
                <ColumnsWrapper>
                    <Box>
                        <h2>Korpa</h2>
                        {cartNotice && <p>{cartNotice}</p>}
                        {cartLoading && <div>Učitavanje korpe...</div>}
                        {!cartLoading && !hasValidCartItems && <div>Vaša korpa je prazna</div>}
                        {hasValidCartItems && (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Ime</th>
                                        <th>Količina</th>
                                        <th>Cena</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => {
                                        const quantity = getCartQuantity(product._id);
                                        const canAddMore = quantity < getStockLimit(product);

                                        return (
                                        <tr key={product._id}>
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    <Image
                                                        src={product.images?.[0] || "/logo.png"}
                                                        alt={product.title || "Product image"}
                                                        width={80}
                                                        height={80}
                                                        sizes="80px"
                                                        style={{ objectFit: "contain" }}
                                                    />
                                                </ProductImageBox>
                                                {product.title}
                                            </ProductInfoCell>
                                            <td>
                                                <CitHolder>
                                                    <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                                                    {quantity}
                                                    <Button
                                                        onClick={() => moreOfThisProduct(product)}
                                                        disabled={!canAddMore}
                                                        title={!canAddMore ? "Nema vise dostupnih komada na stanju" : undefined}
                                                    >
                                                        +
                                                    </Button>
                                                </CitHolder>
                                            </td>
                                            <td>
                                                {quantity * product.price},00 RSD
                                            </td>
                                        </tr>
                                    )})}
                                    <tr>
                                        <td><b>Ukupan iznos (bez poštarine):</b></td>
                                        <td></td>
                                        <td>{total},00 RSD</td>
                                    </tr>
                                    <tr>
                                        <td><b>Poštarina:</b></td>
                                        <td></td>
                                        <td>{shippingCost === 0 ? 'Besplatna' : `${shippingCost},00 RSD`}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Ukupan iznos (sa poštarinom):</b></td>
                                        <td></td>
                                        <td><b>{total + shippingCost},00 RSD</b></td>
                                    </tr>
                                </tbody>
                            </Table>
                        )}
                    </Box>
                    {hasValidCartItems && (
                        <Box>
                            <h2>Informacija o porudžbini</h2>
                            <form onSubmit={handleProceedClick}>
                                <Input type="text" placeholder="Ime i prezime" value={name} name="name" onChange={ev => setName(ev.target.value)} required />
                                <Input
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    name="email"
                                    onChange={ev => setEmail(ev.target.value)}
                                    readOnly={!!user?.email}
                                    style={user?.email ? {
                                        backgroundColor: "#f8f9fa",
                                        color: "#6c757d",
                                        cursor: "not-allowed",
                                    } : undefined}
                                    required
                                />
                                <Input type="text" placeholder="Broj telefona" value={phoneNumber} name="phoneNumber" onChange={ev => setPhoneNumber(ev.target.value)} required />
                                <Input
                                    type="text"
                                    placeholder="Država"
                                    value={country}
                                    name="country"
                                    readOnly
                                    style={{
                                        backgroundColor: "#f8f9fa",
                                        color: "#6c757d",
                                        cursor: "not-allowed",
                                    }}
                                />
                                <CitHolder>
                                    <Input type="text" placeholder="Grad" value={city} name="city" onChange={ev => setCity(ev.target.value)} required />
                                    <Input type="text" placeholder="Poštanski broj" value={postalCode} name="postalCode" onChange={ev => setPostalCode(ev.target.value)} required />
                                </CitHolder>
                                <Input type="text" placeholder="Adresa" value={streetAddress} name="streetAddress" onChange={ev => setStreetAddress(ev.target.value)} required />
                                <Button block black type="submit">Nastavi sa porudžbinom</Button>
                            </form>
                        </Box>
                    )}
                </ColumnsWrapper>

            </Center>
            {showModal && (
                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <ModalHeader>Potrebna registracija</ModalHeader>
                    <ModalText>Morate biti registrovani kako biste nastavili sa porudžbinom.</ModalText>
                    <ButtonWrapper>
                    <ModalButton as={Link} href="/register" primary>
                        Registrujte se
                    </ModalButton>

                    </ButtonWrapper>
                </Modal>
            )}
            {showConfirmModal && (
                <Modal show={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
                    <ModalHeader>Potvrda narudžbine</ModalHeader>
                    <ModalText>Da li ste sigurni da želite da potvrdite ovu narudžbinu?</ModalText>
                    <ButtonWrapper>
                        <ModalButton primary onClick={handleOrderSubmit}>Potvrdi</ModalButton>
                        <ModalButton onClick={() => setShowConfirmModal(false)}>Otkaži</ModalButton>
                    </ButtonWrapper>
                </Modal>
            )}
            {showThankYouModal && (
                <Modal show={showThankYouModal} onClose={() => setShowThankYouModal(false)}>
                    <ModalHeader>Hvala na kupovini!</ModalHeader>
                </Modal>
            )}
            {showWarningModal && (
                <Modal show={showWarningModal} onClose={() => setShowWarningModal(false)}>
                    <ModalHeader>Porudžbina nije moguća</ModalHeader>
                    <ModalText><b>Minimalni iznos</b> porudžbine je <b>1,000 RSD.</b> Dodajte još proizvoda u korpu.</ModalText>
                    <ButtonWrapper>
                        <ModalButton onClick={() => setShowWarningModal(false)}><b>U redu</b></ModalButton>
                    </ButtonWrapper>
                </Modal>
            )}
            <Footer />
        </>
    );
}
