"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface PhoneInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hideLabel?: boolean; // optionally hide the built-in label
  label?: string; // custom label text if shown
}

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

const countries: Country[] = [
  { code: "US", name: "United States", flag: "🇺🇸", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", dialCode: "+44" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰", dialCode: "+92" },
  { code: "IN", name: "India", flag: "🇮🇳", dialCode: "+91" },
  { code: "CA", name: "Canada", flag: "🇨🇦", dialCode: "+1" },
  { code: "AU", name: "Australia", flag: "🇦🇺", dialCode: "+61" },
  { code: "DE", name: "Germany", flag: "🇩🇪", dialCode: "+49" },
  { code: "FR", name: "France", flag: "🇫🇷", dialCode: "+33" },
  { code: "IT", name: "Italy", flag: "🇮🇹", dialCode: "+39" },
  { code: "ES", name: "Spain", flag: "🇪🇸", dialCode: "+34" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", dialCode: "+31" },
  { code: "BE", name: "Belgium", flag: "🇧🇪", dialCode: "+32" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭", dialCode: "+41" },
  { code: "AT", name: "Austria", flag: "🇦🇹", dialCode: "+43" },
  { code: "SE", name: "Sweden", flag: "🇸🇪", dialCode: "+46" },
  { code: "NO", name: "Norway", flag: "🇳🇴", dialCode: "+47" },
  { code: "DK", name: "Denmark", flag: "🇩🇰", dialCode: "+45" },
  { code: "FI", name: "Finland", flag: "🇫🇮", dialCode: "+358" },
  { code: "PL", name: "Poland", flag: "🇵🇱", dialCode: "+48" },
  { code: "GR", name: "Greece", flag: "🇬🇷", dialCode: "+30" },
  { code: "PT", name: "Portugal", flag: "🇵🇹", dialCode: "+351" },
  { code: "IE", name: "Ireland", flag: "🇮🇪", dialCode: "+353" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿", dialCode: "+64" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", dialCode: "+65" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾", dialCode: "+60" },
  { code: "TH", name: "Thailand", flag: "🇹🇭", dialCode: "+66" },
  { code: "PH", name: "Philippines", flag: "🇵🇭", dialCode: "+63" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", dialCode: "+62" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳", dialCode: "+84" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩", dialCode: "+880" },
  { code: "LK", name: "Sri Lanka", flag: "🇱🇰", dialCode: "+94" },
  { code: "AE", name: "UAE", flag: "🇦🇪", dialCode: "+971" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", dialCode: "+966" },
  { code: "QA", name: "Qatar", flag: "🇶🇦", dialCode: "+974" },
  { code: "KW", name: "Kuwait", flag: "🇰🇼", dialCode: "+965" },
  { code: "OM", name: "Oman", flag: "🇴🇲", dialCode: "+968" },
  { code: "BH", name: "Bahrain", flag: "🇧🇭", dialCode: "+973" },
  { code: "TR", name: "Turkey", flag: "🇹🇷", dialCode: "+90" },
  { code: "EG", name: "Egypt", flag: "🇪🇬", dialCode: "+20" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", dialCode: "+27" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", dialCode: "+234" },
  { code: "KE", name: "Kenya", flag: "🇰🇪", dialCode: "+254" },
  { code: "JP", name: "Japan", flag: "🇯🇵", dialCode: "+81" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", dialCode: "+82" },
  { code: "CN", name: "China", flag: "🇨🇳", dialCode: "+86" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", dialCode: "+55" },
  { code: "MX", name: "Mexico", flag: "🇲🇽", dialCode: "+52" },
  { code: "AR", name: "Argentina", flag: "🇦🇷", dialCode: "+54" },
  { code: "CL", name: "Chile", flag: "🇨🇱", dialCode: "+56" },
  { code: "CO", name: "Colombia", flag: "🇨🇴", dialCode: "+57" },
  { code: "RU", name: "Russia", flag: "🇷🇺", dialCode: "+7" },
  { code: "UA", name: "Ukraine", flag: "🇺🇦", dialCode: "+380" },
];

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, hideLabel = false, label = "Phone number" }) => {
  const [countryCode, setCountryCode] = useState("+44");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const isInitialized = useRef(false);

  // Initialize from value prop (handles values with or without dial code)
  useEffect(() => {
    if (!isInitialized.current && value) {
      const matchedCountry = countries.find(c => value.startsWith(c.dialCode));
      if (matchedCountry) {
        setCountryCode(matchedCountry.dialCode);
        setPhoneNumber(value.replace(matchedCountry.dialCode, ""));
      } else {
        // If value doesn't have a dial code, keep default country and prefill digits
        setPhoneNumber(value.replace(/\D/g, ""));
      }
      isInitialized.current = true;
    }
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const emitChange = (code: string, number: string) => {
    const combined = `${code}${number}`;
    onChange({
      target: { name: "phone", value: combined },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleCountrySelect = (dialCode: string) => {
    setCountryCode(dialCode);
    emitChange(dialCode, phoneNumber);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value.replace(/\D/g, "");
    setPhoneNumber(newNumber);
    emitChange(countryCode, newNumber);
  };

  const handleFocus = () => {
    containerRef.current?.classList.add("ring-1", "ring-[#98C1A9]");
  };

  const handleBlur = () => {
    containerRef.current?.classList.remove("ring-1", "ring-[#98C1A9]");
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCountry = countries.find(c => c.dialCode === countryCode) || countries[1];

  return (
    <div className="flex flex-col gap-[8.85px] w-full">
      {!hideLabel && (
        <label className="text-sm font-[400] text-[14px] md:text-[18px] leading-[21px] md:leading-[27px] text-[#666664] opacity-40">
          {label}<span className="text-red-500">*</span>
        </label>
      )}

      <div className="relative" ref={dropdownRef}>
        <div
          ref={containerRef}
          className="flex items-center border border-[#C2C2C1] rounded-[14px] h-[43px] md:h-[55px] px-3 bg-white transition-all"
        >
          {/* Country Selector Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-transparent p-2 outline-none text-[#666664] text-sm h-full cursor-pointer rounded-lg transition-colors"
          >
            <span className="font-medium">{selectedCountry.dialCode}</span>
            <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          <div className="w-[1px] h-[24px] md:h-[30px] bg-[#D9D9D9] mx-2"></div>

          {/* Phone Number Input */}
          <input
            type="tel"
            name="phone"
            value={phoneNumber}
            onChange={handlePhoneChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder=""
            className="flex-1 h-full text-sm text-[#333] bg-transparent outline-none"
            required
          />
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-[#C2C2C1] rounded-[14px] shadow-lg max-h-[300px] overflow-hidden">
            {/* Search Input */}
            <div className="p-3 border-b border-[#C2C2C1]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search country..."
                className="w-full px-3 py-2 text-sm border border-[#C2C2C1] rounded-lg outline-none focus:ring-1 focus:ring-[#98C1A9]"
              />
            </div>

            {/* Country List */}
            <div className="overflow-y-auto max-h-[240px]">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country.dialCode)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors cursor-pointer ${
                      country.dialCode === countryCode ? 'bg-[#98C1A9]/10' : ''
                    }`}
                  >
                    <span className="text-xs font-bold">{country.code}</span>
                    <span className="flex-1 text-sm text-[#666664]">{country.name}</span>
                    <span className="text-sm font-medium text-[#666664]">{country.dialCode}</span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-sm text-[#666664] opacity-60">
                  No countries found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneInput;
