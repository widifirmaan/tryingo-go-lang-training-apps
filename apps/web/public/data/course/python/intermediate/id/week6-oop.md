# Object-Oriented Programming

> **Kategori:** Python | **Level:** Menengah | **Minggu 6:** Object-Oriented Programming

## Tujuan Pembelajaran

- Membuat class dengan __init__, self, dan instance methods
- Inheritance: super() dan method overriding
- Abstract Base Class (ABC) dengan @abstractmethod
- Encapsulation: _protected, __private, @property
- Dunder methods: __str__, __repr__, __init__

---

## Program: Sistem Bank

```python

# Object-Oriented Programming
from abc import ABC, abstractmethod

class BankAccount:
    """Rekening bank dengan OOP."""
    bank_name = "Python Bank"

    def __init__(self, owner: str, balance: float = 0):
        self.owner = owner
        self._balance = balance
        self.__id = id(self)

    def deposit(self, amount: float):
        if amount <= 0:
            raise ValueError("Jumlah deposit harus positif")
        self._balance += amount
        return self

    def withdraw(self, amount: float):
        if amount > self._balance:
            raise ValueError("Saldo tidak cukup")
        self._balance -= amount
        return self

    @property
    def balance(self):
        return self._balance

    def __str__(self):
        return f"{self.owner}: Rp{self._balance:,.0f}"

    def __repr__(self):
        return f"BankAccount('{self.owner}', {self._balance})"

class SavingsAccount(BankAccount):
    """Rekening tabungan dengan bunga."""

    def __init__(self, owner: str, balance: float = 0, rate: float = 0.05):
        super().__init__(owner, balance)
        self.rate = rate

    def add_interest(self):
        interest = self._balance * self.rate
        self._balance += interest
        return interest

class Shape(ABC):
    @abstractmethod
    def area(self): pass

    @abstractmethod
    def perimeter(self): pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self): return self.width * self.height
    def perimeter(self): return 2 * (self.width + self.height)
    def __str__(self): return f"Rectangle({self.width}x{self.height})"

# Main Program
print("=== Bank Account ===")
acc = BankAccount("Budi", 1000000)
acc.deposit(500000)
acc.withdraw(200000)
print(f"Account: {acc}")
print(f"Balance: Rp{acc.balance:,.0f}")

print("\n=== Savings Account ===")
savings = SavingsAccount("Siti", 2000000)
interest = savings.add_interest()
print(f"Savings: {savings}")
print(f"Bunga: Rp{interest:,.0f}")

print("\n=== Abstract Class ===")
rect = Rectangle(5, 3)
print(f"{rect} -> Area: {rect.area()}, Perimeter: {rect.perimeter()}")

print("\n=== isinstance checks ===")
print(f"acc is BankAccount: {isinstance(acc, BankAccount)}")
print(f"savings is BankAccount: {isinstance(savings, BankAccount)}")
print(f"rect is Shape: {isinstance(rect, Shape)}")
    
```

---

## Konsep Kunci

### Class & __init__
`self` = instance. `__init__` = constructor. Method pertama param = self.

### Inheritance
`class Child(Parent)`. `super().__init__()` panggil parent constructor.

### ABC
`@abstractmethod` wajib diimplement subclass. Tidak bisa instantiate ABC langsung.

### Encapsulation
`_protected` convention, `__private` name mangling. `@property` untuk getter.

### Dunder Methods
`__str__` user-friendly, `__repr__` developer/debug. Lainnya: `__eq__`, `__len__`, `__getitem__`.

---

## Eksperimen

- Buat class hierarchy: Animal -> Dog, Cat
- Coba @property untuk computed attribute
- Buat class dengan __eq__ dan __lt__
- Eksperimen dengan multiple inheritance
- Buat custom iterator dengan __iter__ dan __next__

---

## Tantangan

Buat sistem perpustakaan: class Book, Member, Library. Method: borrow, return, search. Gunakan inheritance dan encapsulation.

---

## Ringkasan

Minggu 6 dari 12: **Object-Oriented Programming** (Level: Menengah). Python OOP yang powerful. Minggu depan: **File I/O & Error Handling**.
