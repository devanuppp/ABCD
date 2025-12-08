import React from 'react';
import { Mail, Phone, Twitter, Linkedin, Instagram, Github, Heart, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full border-t border-white/10 bg-black/20 backdrop-blur-lg mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand & Copyright */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            E-Voting
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering democracy with secure, transparent, and accessible e-voting solutions.
                            Built for the future of governance.
                        </p>
                        <div className="pt-4 flex items-center gap-2 text-sm text-gray-500">
                            <span>&copy; {new Date().getFullYear()} Team Alpha. All rights reserved.</span>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Contact Us</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="mailto:contact@teamalpha.com" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group">
                                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <span>anupkatwal224@gmail.com</span>
                                </a>
                            </li>
                            <li>
                                <a href="tel:+1234567890" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group">
                                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors">
                                        <Phone size={18} />
                                    </div>
                                    <span>+977 9700824486</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Connect</h4>
                        <div className="flex flex-wrap gap-4">
                            {[
                                { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/yogeshh.666' },
                                { icon: Twitter, label: 'Twitter', href: 'https://x.com/anup_101' },
                                { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/anup-katwal-365767393/' },
                                { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/_the.anupp/' },
                                { icon: Github, label: 'GitHub', href: 'https://github.com/devanuppp' }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="p-3 rounded-xl bg-white/5 hover:bg-primary/20 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 border border-white/5 hover:border-primary/30"
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>
                        Made with <Heart size={14} className="inline text-red-500 mx-1 fill-red-500/20" /> by Team Alpha
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
